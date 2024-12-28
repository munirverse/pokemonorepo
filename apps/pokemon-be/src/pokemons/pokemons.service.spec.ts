import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsService, SIMPLE_POKEMON_DATA } from './pokemons.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { PokemonsRepository } from './pokemons.repository';
import { InternalServerErrorException } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('PokemonsService', () => {
  let service: PokemonsService;
  let repository: PokemonsRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonsService],
    })
      .useMocker((token) => {
        const findPokemonsMockData = {
          cursor: {
            lastId: 26,
            hasNextPage: true,
          },
          data: [
            {
              id: 25,
              name: 'pikachu',
              types: [
                {
                  types: {
                    name: 'electric',
                  },
                },
              ],
              species: {
                color: 'yellow',
                shape: 'quadruped',
              },
              sprites: [
                {
                  category: 'home',
                  viewAngle: 'front_default',
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
                },
              ],
            },
          ],
        };

        const getPokemonTypeListMockData = [
          { name: 'dragon' },
          { name: 'rock' },
          { name: '' },
        ];

        const getPokemonShapesListMockData = [
          {
            shape: 'tentacles',
          },
          {
            shape: 'arms',
          },
          { shape: '' },
        ];

        if (token === PokemonsRepository) {
          return {
            find: jest.fn().mockResolvedValue(findPokemonsMockData),
            groupByTypes: jest
              .fn()
              .mockResolvedValue(getPokemonTypeListMockData),
            groupByShapes: jest
              .fn()
              .mockResolvedValue(getPokemonShapesListMockData),
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

    service = module.get<PokemonsService>(PokemonsService);

    repository = module.get<PokemonsRepository>(PokemonsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPokemons test', () => {
    it('should called expected function and return expected result', async () => {
      // Given
      const params = {};

      const expectedResult: SIMPLE_POKEMON_DATA[] = [
        {
          id: 25,
          name: 'pikachu',
          types: ['electric'],
          color: 'yellow',
          shape: 'quadruped',
          icon: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
          ],
        },
      ];

      // When
      const data = await service.findPokemons(params);

      // Then
      expect(repository.find).toHaveBeenCalled();

      expect(data.data).toMatchObject(expectedResult);
    });

    it('should throw expected error', async () => {
      // Given
      const expectedErrorCause = new Error('Repository Failed');

      (repository.find as jest.Mock).mockRejectedValue(expectedErrorCause);

      // When & Then
      try {
        await service.findPokemons({});
      } catch (error) {
        expect(repository.find).toHaveBeenCalled();

        expect(error instanceof InternalServerErrorException).toBe(true);

        expect(error.getResponse()).toMatchObject({
          error: expectedErrorCause.message,
          message: 'failed to get pokemons',
          statusCode: 500,
        });
      }
    });
  });

  describe('getPokemonTypeList test', () => {
    it('should called expected function and return expected result', async () => {
      // Given
      const expectedResult = [{ type: 'dragon' }, { type: 'rock' }];

      // When
      const data = await service.getPokemonTypesList();

      // Then
      expect(repository.groupByTypes).toHaveBeenCalled();

      expect(data.data).toMatchObject(expectedResult);
    });

    it('should throw expected error', async () => {
      // Given
      const expectedErrorCause = new Error('Repository Failed');

      (repository.groupByTypes as jest.Mock).mockRejectedValue(
        expectedErrorCause
      );

      // When & Then
      try {
        await service.getPokemonTypesList();
      } catch (error) {
        expect(repository.groupByTypes).toHaveBeenCalled();

        expect(error instanceof InternalServerErrorException).toBe(true);

        expect(error.getResponse()).toMatchObject({
          error: expectedErrorCause.message,
          message: 'failed to get list of pokemon types',
          statusCode: 500,
        });
      }
    });
  });

  describe('getPokemonShapesList test', () => {
    it('should called expected function and return expected result', async () => {
      // Given
      const expectedResult = [
        {
          shape: 'tentacles',
        },
        {
          shape: 'arms',
        },
      ];

      // When
      const data = await service.getPokemonShapesList();

      // Then
      expect(repository.groupByShapes).toHaveBeenCalled();

      expect(data.data).toMatchObject(expectedResult);
    });

    it('should throw expected error', async () => {
      // Given
      const expectedErrorCause = new Error('Repository Failed');

      (repository.groupByShapes as jest.Mock).mockRejectedValue(
        expectedErrorCause
      );

      // When & Then
      try {
        await service.getPokemonShapesList();
      } catch (error) {
        expect(repository.groupByShapes).toHaveBeenCalled();

        expect(error instanceof InternalServerErrorException).toBe(true);

        expect(error.getResponse()).toMatchObject({
          error: expectedErrorCause.message,
          message: 'failed to get list of pokemon shapes',
          statusCode: 500,
        });
      }
    });
  });
});
