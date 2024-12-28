import { Test, TestingModule } from '@nestjs/testing';
import { PokemonFindParams, PokemonsRepository } from './pokemons.repository';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('PokemonsRepository', () => {
  let provider: PokemonsRepository;
  let service: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonsRepository],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return {
            pokemon: {
              findMany: jest.fn().mockResolvedValue(true),
              count: jest.fn().mockResolvedValue(1),
            },
            types: {
              groupBy: jest.fn().mockResolvedValue(true),
            },
            species: {
              groupBy: jest.fn().mockResolvedValue(true),
            },
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as MockFunctionMetadata<any, any>;

          const Mock = moduleMocker.generateFromMetadata(mockMetadata);

          return new Mock();
        }
      })
      .compile();

    provider = module.get<PokemonsRepository>(PokemonsRepository);
    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('find test', () => {
    it('should return expected where filters', async () => {
      // Given
      const params: PokemonFindParams = {
        onlyFilters: true,
        id: 25,
        name: 'pikachu',
        types: 'electric',
        color: 'yellow',
        shape: 'quadruped ',
      };

      const expectedWhereFilters: Prisma.PokemonFindManyArgs = {
        where: {
          id: 25,
          name: { contains: '%pikachu%' },
          types: {
            some: {
              types: {
                name: 'electric',
              },
            },
          },
          species: {
            color: 'yellow',
            shape: 'quadruped ',
          },
        },
      };

      // When
      const filters = (await provider.find(
        params
      )) as Prisma.PokemonFindManyArgs;

      // Then
      expect(filters.where).toMatchObject(expectedWhereFilters.where);
    });

    it('should return expected pagination filters', async () => {
      // Given
      const params: PokemonFindParams = { onlyFilters: true };

      const expectedPaginationFilters: Prisma.PokemonFindManyArgs = {
        skip: 0,
        take: 10,
      };

      const params2: PokemonFindParams = {
        page: 2,
        limit: 20,
        onlyFilters: true,
      };

      const expectedPaginationFilters2: Prisma.PokemonFindManyArgs = {
        skip: 20,
        take: 20,
      };

      const params3: PokemonFindParams = {
        cursor: true,
        lastId: 30,
        limit: 10,
        onlyFilters: true,
      };

      const expectedPaginationFilters3: Prisma.PokemonFindManyArgs = {
        cursor: {
          id: 30,
        },
        take: 10,
        skip: 1,
      };

      // When
      const filters = (await provider.find(
        params
      )) as Prisma.PokemonFindManyArgs;

      const filters2 = (await provider.find(
        params2
      )) as Prisma.PokemonFindManyArgs;

      const filters3 = (await provider.find(
        params3
      )) as Prisma.PokemonFindManyArgs;

      // Then
      expect(filters.skip).toEqual(expectedPaginationFilters.skip);

      expect(filters.take).toEqual(expectedPaginationFilters.take);

      expect(filters2.skip).toEqual(expectedPaginationFilters2.skip);

      expect(filters2.take).toEqual(expectedPaginationFilters2.take);

      expect(filters3.cursor).toMatchObject(expectedPaginationFilters3.cursor);

      expect(filters3.take).toEqual(expectedPaginationFilters3.take);

      expect(filters3.skip).toEqual(expectedPaginationFilters3.skip);
    });

    it('should called expected service method', async () => {
      // Given
      const params: PokemonFindParams = {};

      const params2: PokemonFindParams = {
        cursor: true,
        lastId: 30,
      };

      // When
      await provider.find(params);

      await provider.find(params2);

      // Then
      expect(service.pokemon.findMany).toHaveBeenCalledTimes(2);

      expect(service.pokemon.count).toHaveBeenCalledTimes(2);
    });
  });

  describe('groupByTypes test', () => {
    it('should called expected service method', async () => {
      // Given
      // When
      await provider.groupByTypes();

      // Then
      expect(service.types.groupBy).toHaveBeenCalledTimes(1);
    });
  });
  describe('groupByShapes test', () => {
    it('should called expected service method', async () => {
      // Given
      // When
      await provider.groupByShapes();

      // Then
      expect(service.species.groupBy).toHaveBeenCalledTimes(1);
    });
  });
});
