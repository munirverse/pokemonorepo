import { PrismaClient } from '@prisma/client';
import { fetch, getLastPathValue } from '@pokemonorepo/shared';

const db = new PrismaClient();

const baseUrl = 'https://pokeapi.co/api/v2';

type PokemonSpriteAngle = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

type PokemonSpritesResponse = PokemonSpriteAngle & {
  other: {
    dream_world: PokemonSpriteAngle;
    home: PokemonSpriteAngle;
    'official-artwork': PokemonSpriteAngle;
    showdown: PokemonSpriteAngle;
  };
};

type PokemonStatsReponse = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type PokemonTypeSlotsResponse = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonTypesResponse = {
  name: string;
  damage_relations: object;
};

type PokemonDetailResponse = {
  weight: number;
  height: number;
  cries: {
    latest: string;
    legacy: string;
  };
  abilities: [];
  moves: [];
  sprites: PokemonSpritesResponse;
  stats: PokemonStatsReponse[];
  types: PokemonTypeSlotsResponse[];
};

type PokemonDetail = {
  weight: number;
  height: number;
  cries: string;
  abilities: [];
  moves: [];
  pokemonId: number;
};

type PokemonSprite = {
  pokemonId: number;
  category: string;
  url: string;
  viewAngle: string;
};

type PokemonStat = {
  pokemonId: number;
  name: string;
  baseStat: number;
};

type PokemonTypeSlot = {
  pokemonId: number;
  typeId: number;
  order: number;
};

type PokemonType = {
  id: number;
  name: string;
  damageRelations: object;
};

type SyncProcess = {
  func: (arg0: unknown) => Promise<unknown>;
  data: unknown[];
};

async function getLastPokemon(db: PrismaClient) {
  return db.pokemon.findFirst({
    orderBy: { id: 'desc' },
    select: { id: true },
  });
}

async function recPokemonDetailScrap(
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

    const isExistPokemonDetail = await db.detail.findMany({
      where: { id: { in: pokemonBatch.map((item) => item.id) } },
    });

    if (!isExistPokemonDetail.length) {
      console.log(
        `insert details, sprites, stats & typeslot of ${pokemonBatch
          .map((item) => item.name)
          .join(', ')} to database\n`
      );

      const pokemonSprites: (PokemonSpriteAngle & {
        pokemonId: number;
        category: string;
      })[] = [];
      const pokemonStats: (PokemonStatsReponse & { pokemonId: number })[] = [];
      const pokemonTypeSlots: (PokemonTypeSlotsResponse & {
        pokemonId: number;
      })[] = [];
      const pokemonTypes: PokemonType[] = [];

      const insertPokemonDetails = await Promise.all<Promise<PokemonDetail>[]>(
        pokemonBatch.map(async (item) => {
          const {
            weight,
            height,
            cries,
            abilities,
            moves,
            sprites,
            stats,
            types,
          } = await fetch<PokemonDetailResponse>(
            `${baseUrl}/pokemon/${item.name}`
          );

          // push data sprite (default)
          pokemonSprites.push({
            pokemonId: item.id,
            category: 'default',
            back_default: sprites.back_default,
            back_female: sprites.back_female,
            back_shiny: sprites.back_shiny,
            back_shiny_female: sprites.back_shiny_female,
            front_default: sprites.front_default,
            front_female: sprites.front_female,
            front_shiny: sprites.front_shiny,
            front_shiny_female: sprites.front_shiny_female,
          });

          // push data sprite (other)
          for (const itemSprite in sprites.other) {
            pokemonSprites.push({
              pokemonId: item.id,
              category: itemSprite,
              ...sprites.other[itemSprite],
            });
          }

          // push data stat
          stats.forEach((itemStat) => {
            pokemonStats.push({ pokemonId: item.id, ...itemStat });
          });

          // push data type slot
          types.forEach((itemType) => {
            pokemonTypeSlots.push({ pokemonId: item.id, ...itemType });
          });

          return {
            pokemonId: item.id,
            weight,
            height,
            cries: cries.latest,
            abilities,
            moves,
          };
        })
      );

      const insertPokemonSprites: PokemonSprite[] = [];

      for (const item of pokemonSprites) {
        for (const keyName in item) {
          if (!['pokemonId', 'category'].includes(keyName)) {
            if (item[keyName]) {
              insertPokemonSprites.push({
                pokemonId: item.pokemonId,
                category: item.category,
                viewAngle: keyName,
                url: item[keyName],
              });
            }
          }
        }
      }

      const insertPokemonStats: PokemonStat[] = pokemonStats.map((item) => ({
        pokemonId: item.pokemonId,
        name: item.stat.name,
        baseStat: item.base_stat,
      }));

      const insertPokemonTypeSlots: PokemonTypeSlot[] = await Promise.all(
        pokemonTypeSlots.map(async (item) => {
          const {
            pokemonId,
            type: { url },
            slot,
          } = item;
          const typeId = parseInt(getLastPathValue(url));

          // fetch & push pokemon types
          const { name, damage_relations } = await fetch<PokemonTypesResponse>(
            url
          );
          pokemonTypes.push({
            id: typeId,
            name,
            damageRelations: damage_relations,
          });

          return {
            pokemonId,
            typeId,
            order: slot,
          };
        })
      );

      const insertPokemonTypes: PokemonType[] = [];

      for (const type of pokemonTypes) {
        // check duplicates on database
        const isTypeExists = await db.types.findFirst({
          where: { id: type.id },
        });
        if (isTypeExists) {
          continue;
        }

        // check duplicates on array list
        if (
          insertPokemonTypes.find((insertType) => insertType.id === type.id)
        ) {
          continue;
        }

        insertPokemonTypes.push(type);
      }

      const insertProcess: SyncProcess[] = [
        { func: db.detail.createMany, data: insertPokemonDetails },
        { func: db.sprites.createMany, data: insertPokemonSprites },
        { func: db.stats.createMany, data: insertPokemonStats },
        { func: db.types.createMany, data: insertPokemonTypes },
        { func: db.typeSlots.createMany, data: insertPokemonTypeSlots },
      ];

      // Running all process with sync
      for (const process of insertProcess) {
        if (process.data.length) {
          await process.func({ data: process.data });
        }
      }
    } else {
      console.log(
        `found details, sprites, stats & typeslot of ${pokemonBatch
          .map((item) => item.name)
          .join(', ')}. Skip insert...\n`
      );
    }

    if (rangeIdEnd < maxId)
      return recPokemonDetailScrap(db, maxId, batchNumber, rangeIdEnd);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function main() {
  try {
    const lastPokemon = await getLastPokemon(db);
    await recPokemonDetailScrap(db, lastPokemon.id);

    console.log('success insert all pokemon details');
  } catch (error) {
    throw new Error(
      `failed to scrap details of pokemons, cause: ${error.message}`
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
