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

export interface ResultWithPagination<T> {
  pagination: {
    pageNumber: number;
    pageSize: number;
    pageTotal: number;
  };
  data: T;
}

export interface ResultWithCursor<T> {
  cursor: {
    lastId: number;
    hasNextPage: boolean;
  };
  data: T;
}

@Injectable()
export class PokemonsRepository {
  constructor(private prismaService: PrismaService) {}

  async find(
    params: PokemonFindParams
  ): Promise<
    | ResultWithPagination<Pokemon[]>
    | ResultWithCursor<Pokemon[]>
    | Prisma.PokemonFindManyArgs
  > {
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
      where.name = { contains: `%${params.name}%` };
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
      filters.skip = 1; // skip the cursor
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
    const data = await this.prismaService.pokemon.findMany(filters);

    // build result metadata cursor
    if (params.cursor) {
      const dataNextCount = await this.prismaService.pokemon.count({
        where: {
          ...filters.where,
          id: {
            gt: data?.[data.length - 1]?.id || params.lastId,
          },
        },
        take: params.limit,
      });

      return {
        cursor: {
          lastId: params.lastId,
          hasNextPage: dataNextCount > 0 ? true : false,
        },
        data,
      };
    }

    // build result metadata pagination
    const dataCount = await this.prismaService.pokemon.count({
      where: filters.where,
    });

    return {
      pagination: {
        pageNumber: params.page || 1,
        pageSize: data.length,
        pageTotal: Math.ceil(
          dataCount / (params.limit || DEFAULT_PAGINATION_LIMIT)
        ),
      },
      data,
    };
  }

  async groupByTypes() {
    return this.prismaService.types.groupBy({ by: ['name'] });
  }

  async groupByShapes() {
    return this.prismaService.species.groupBy({ by: ['shape'] });
  }
}
