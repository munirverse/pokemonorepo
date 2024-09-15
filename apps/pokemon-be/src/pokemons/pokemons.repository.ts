import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Pokemon, Prisma } from '@prisma/client';

const DEFAULT_PAGINATION_LIMIT = 10;

export interface PokemonFindParams {
  id?: number;
  name?: string;
  types?: string;
  color?: string;
  shape?: string;
  page?: number;
  limit?: number;
  cursor?: boolean;
  lastId?: number;
  onlyFilters?: boolean;
}

@Injectable()
export class PokemonsRepository {
  constructor(private prismaService: PrismaService) {}

  async find(
    params: PokemonFindParams
  ): Promise<Pokemon[] | Prisma.PokemonFindManyArgs> {
    // build object filters
    const filters: Prisma.PokemonFindManyArgs = {
      include: {
        sprites: true,
        types: { include: { types: true } },
        species: true,
      },
      take: params.limit || DEFAULT_PAGINATION_LIMIT,
      orderBy: { id: 'asc' },
    };

    // build where filters
    const where: Prisma.PokemonWhereInput = {
      species: {},
    };

    if (params.id) {
      where.id = params.id;
    }

    if (params.name) {
      where.name = params.name;
    }

    if (params.types) {
      where.types = {
        some: {
          types: {
            name: params.types,
          },
        },
      };
    }

    if (params.color) {
      where.species.color = params.color;
    }

    if (params.shape) {
      where.species.shape = params.shape;
    }

    // finalize object filters
    if (params.cursor && params.lastId) {
      filters.cursor = {
        id: params.lastId,
      };
    } else if (params.page) {
      const { page, limit } = params;

      filters.skip = page > 1 ? (page - 1) * limit : 0;
    } else {
      filters.skip = 0;
    }

    if (Object.keys(where).length) {
      filters.where = where;
    }

    // return only filters
    if (params.onlyFilters) {
      return filters;
    }

    // execute prisma service
    return this.prismaService.pokemon.findMany(filters);
  }
}
