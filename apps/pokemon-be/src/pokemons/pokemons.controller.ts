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
  async getData(@Query() pokemonDto: FindPokemonDto) {
    return this.service.getPokemons(pokemonDto);
  }
}
