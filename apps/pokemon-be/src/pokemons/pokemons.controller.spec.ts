import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from './pokemons.controller';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { PokemonsService } from './pokemons.service';
import { FindPokemonDto } from './dto/find-pokemon.dto';

const moduleMocker = new ModuleMocker(global);

describe('PokemonsController', () => {
  let controller: PokemonsController;
  let provider: PokemonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonsController],
    })
      .useMocker((token) => {
        if (token === PokemonsService) {
          return { getPokemons: jest.fn().mockResolvedValue(true) };
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

    controller = module.get<PokemonsController>(PokemonsController);

    provider = module.get<PokemonsService>(PokemonsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should called expected provider', async () => {
    // Given
    const query: FindPokemonDto = {
      id: 0,
      name: '',
      types: '',
      color: '',
      shape: '',
      page: 0,
      cursor: false,
      lastId: 0,
      limit: 0,
    };

    // When
    await controller.getData(query);

    // Then
    expect(provider.getPokemons).toHaveBeenCalled();
  });
});
