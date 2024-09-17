import { Controller, Get, Query } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { FindPokemonDto } from './dto/find-pokemon.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private service: PokemonsService) {}

  @Get()
  async getData(@Query() pokemonDto: FindPokemonDto) {
    return this.service.getPokemons(pokemonDto);
  }
}
