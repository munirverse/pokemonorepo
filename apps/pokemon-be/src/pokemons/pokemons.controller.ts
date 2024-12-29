import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PokemonsService } from './pokemons.service';
import { FindPokemonDto } from './dto/find-pokemon.dto';
import findPokemonsExample from './examples/find-pokemons.example';
import getPokemonTypesListExample from './examples/get-pokemon-types-list';
import getPokemonTypesShapesExample from './examples/get-pokemon-types-shapes';

@ApiTags('pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private service: PokemonsService) {}

  @Get()
  @ApiOperation({ summary: 'Find Pokemons' })
  @ApiResponse(findPokemonsExample)
  async findPokemons(@Query() pokemonDto: FindPokemonDto) {
    return this.service.findPokemons(pokemonDto);
  }

  @Get('/types')
  @ApiOperation({ summary: 'Get List of Pokemon Types' })
  @ApiResponse(getPokemonTypesListExample)
  async getPokemonTypesList() {
    return this.service.getPokemonTypesList();
  }

  @Get('/shapes')
  @ApiOperation({ summary: 'Get List of Pokemon Shapes' })
  @ApiResponse(getPokemonTypesShapesExample)
  async getPokemonShapesList() {
    return this.service.getPokemonShapesList();
  }
}
