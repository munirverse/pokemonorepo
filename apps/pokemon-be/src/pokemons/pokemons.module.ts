import { Module } from '@nestjs/common';
import { PokemonsRepository } from './pokemons.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';

@Module({
  imports: [PrismaModule],
  providers: [PokemonsRepository, PokemonsService],
  controllers: [PokemonsController],
})
export class PokemonsModule {}
