import { PrismaClient } from '@prisma/client';
import { fetch, getLastPathValue } from '@pokemonorepo/shared';

const db = new PrismaClient();

const baseUrl = 'https://pokeapi.co/api/v2';

type NameAndUrl = {
  name: string;
  url: string;
};

type PokemonSpeciesResponse = {
  capture_rate: number;
  color: NameAndUrl;
  is_baby: boolean;
  shape: NameAndUrl;
  evolves_from_species: null | NameAndUrl;
  varieties: [];
};

type PokemonSpecies = {
  pokemonId: number;
  captureRate: number;
  color: string;
  isBaby: boolean;
  shape: string;
  evolveFromSpecies: number;
  varieties: [];
};

async function getLastPokemon(db: PrismaClient) {
  return db.pokemon.findFirst({
    orderBy: { id: 'desc' },
    select: { id: true },
  });
}

async function recPokemonSpeciesScrap(
  db: PrismaClient,
  maxId: number,
  batchNumber = 10,
  lastId?: number
) {
  try {
    const rangeIdStart = lastId || 1;
    let rangeIdEnd = rangeIdStart + batchNumber;
    if (rangeIdEnd > maxId) rangeIdEnd = maxId + 1;

    const pokemonBatch = await db.pokemon.findMany({
      where: { id: { gte: rangeIdStart, lt: rangeIdEnd } },
    });

    const isExistPokemonSpecies = await db.species.findMany({
      where: { id: { in: pokemonBatch.map((item) => item.id) } },
    });

    if (!isExistPokemonSpecies.length) {
      console.log(
        `insert species ${pokemonBatch
          .map((item) => item.name)
          .join(', ')} to database\n`
      );

      const insertPokemonSpecies = await Promise.all<Promise<PokemonSpecies>[]>(
        pokemonBatch.map(async (item) => {
          const {
            capture_rate,
            color,
            is_baby,
            shape,
            evolves_from_species,
            varieties,
          } = await fetch<PokemonSpeciesResponse>(
            `${baseUrl}/pokemon-species/${item.id}`
          );

          return {
            pokemonId: item.id,
            captureRate: capture_rate || 0,
            color: color?.name || '',
            isBaby: is_baby || false,
            shape: shape?.name || '',
            evolveFromSpecies: evolves_from_species
              ? parseInt(getLastPathValue(evolves_from_species.url))
              : 0,
            varieties: varieties || [],
          };
        })
      );

      await db.species.createMany({ data: insertPokemonSpecies });
    } else {
      console.log(
        `found species ${pokemonBatch
          .map((item) => item.name)
          .join(', ')}. Skip insert...\n`
      );
    }

    if (rangeIdEnd < maxId)
      return recPokemonSpeciesScrap(db, maxId, batchNumber, rangeIdEnd);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function main() {
  try {
    const lastPokemon = await getLastPokemon(db);
    await recPokemonSpeciesScrap(db, lastPokemon.id);

    console.log('success insert all pokemon species');
  } catch (error) {
    throw new Error(
      `failed to scrap species of pokemons, cause: ${error.message}`
    );
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
