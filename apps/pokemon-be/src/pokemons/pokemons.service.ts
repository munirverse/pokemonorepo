import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  PokemonFindParams,
  PokemonsRepository,
  ResultWithCursor,
} from './pokemons.repository';
import { Prisma } from '@prisma/client';

const POKEMON_CATEGORY = {
  DEFAULT: 'default',
  OFFICIAL_ARTWORK: 'official-artwork',
  DREAM_WORLD: 'dream_world',
  HOME: 'home',
  SHOWDOWN: 'showdown',
} as const;

const POKEMON_VIEW_ANGLE = {
  FRONT_DEFAULT: 'front_default',
  BACK_FEMALE: 'back_female',
  BACK_SHINY_FEMALE: 'back_shiny_female',
  FRONT_SHINY: 'front_shiny',
  BACK_DEFAULT: 'back_default',
  FRONT_SHINY_FEMALE: 'front_shiny_female',
  FRONT_FEMALE: 'front_female',
  BACK_SHINY: 'back_shiny',
} as const;

type PokemonFullPayload = Prisma.PokemonGetPayload<{
  include: {
    sprites: true;
    species: true;
    types: { include: { types: true } };
  };
}>;

export type SIMPLE_POKEMON_DATA = {
  id: number;
  name: string;
  types: string[];
  color: string;
  shape: string;
  icon: string[];
};

@Injectable()
export class PokemonsService {
  constructor(private repository: PokemonsRepository) {}

  async getPokemons(params: PokemonFindParams) {
    try {
      const rawData = (await this.repository.find(params)) as ResultWithCursor<
        PokemonFullPayload[]
      >;

      const data = rawData.data.map<SIMPLE_POKEMON_DATA>((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((typeList) => typeList.types.name),
        color: pokemon.species.color,
        shape: pokemon.species.shape,
        icon: pokemon.sprites
          .filter(
            (sprite) =>
              sprite.category === POKEMON_CATEGORY.HOME &&
              sprite.viewAngle === POKEMON_VIEW_ANGLE.FRONT_DEFAULT
          )
          .map((sprite) => sprite.url),
      }));

      return {
        ...rawData,
        data: data,
      };
    } catch (error) {
      throw new InternalServerErrorException('failed to get pokemons', {
        cause: error,
        description: error.message,
      });
    }
  }
}
