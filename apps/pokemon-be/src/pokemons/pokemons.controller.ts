import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PokemonsService } from './pokemons.service';
import { FindPokemonDto } from './dto/find-pokemon.dto';
import findPokemonExample from './examples/find-pokemon.example';

@ApiTags('pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private service: PokemonsService) {}

  @Get()
  @ApiOperation({ summary: 'Find Pokemons' })
  @ApiResponse(findPokemonExample)
  async findPokemons(@Query() pokemonDto: FindPokemonDto) {
    return this.service.findPokemons(pokemonDto);
  }

  @Get('/types')
  @ApiOperation({ summary: 'Get List of Pokemon Types' })
  async getPokemonTypesList() {
    return this.service.getPokemonTypesList();
  }

  @Get('/shapes')
  @ApiOperation({ summary: 'Get List of Pokemon Shapes' })
  async getPokemonShapesList() {
    return this.service.getPokemonShapesList();
  }
}
