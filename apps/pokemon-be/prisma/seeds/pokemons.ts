import { PrismaClient } from '@prisma/client';
import { fetch, getLastPathValue } from '@pokemonorepo/shared';

const db = new PrismaClient();

const baseUrl = 'https://pokeapi.co/api/v2';

type PokemonsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

async function recPokemonScrap(db: PrismaClient, nextUrl?: string) {
  try {
    const url = nextUrl || `${baseUrl}/pokemon`;

    const { results, next } = await fetch<PokemonsResponse>(url);

    const isExistPokemon = await db.pokemon.findMany({
      where: {
        id: { in: results.map((item) => parseInt(getLastPathValue(item.url))) },
      },
    });

    if (!isExistPokemon.length) {
      console.log(
        `insert ${results.map((item) => item.name).join(', ')} to database\n`
      );

      await db.pokemon.createMany({
        data: results.map((item) => ({
          name: item.name,
          id: parseInt(getLastPathValue(item.url)),
        })),
        skipDuplicates: true,
      });
    } else {
      console.log(
        `found ${results.map((item) => item.name).join(', ')}. Skip insert...\n`
      );
    }

    if (next) {
      return recPokemonScrap(db, next);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function main() {
  try {
    await recPokemonScrap(db);
    console.log('success insert all pokemon');
  } catch (error) {
    throw new Error(
      `failed to scrap list of pokemons, cause: ${error.message}`
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
