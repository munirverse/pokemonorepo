import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsService, SIMPLE_POKEMON_DATA } from './pokemons.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { PokemonsRepository } from './pokemons.repository';

const moduleMocker = new ModuleMocker(global);

describe('PokemonsService', () => {
  let service: PokemonsService;
  let repository: PokemonsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonsService],
    })
      .useMocker((token) => {
        const mockData = {
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

        if (token === PokemonsRepository) {
          return { find: jest.fn().mockResolvedValue(mockData) };
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
    const data = await service.getPokemons(params);

    // Then
    expect(repository.find).toHaveBeenCalled();

    expect(data.data).toMatchObject(expectedResult);
  });
});
