import { Module } from '@nestjs/common';
import { PokemonsRepository } from './pokemons.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PokemonsRepository],
})
export class PokemonsModule {}
