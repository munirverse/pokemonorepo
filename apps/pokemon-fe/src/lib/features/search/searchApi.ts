import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPokemonRes } from './searchType';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5300/api' }),
  endpoints: (builder) => ({
    getPokemon: builder.query<GetPokemonRes, string>({
      query: (params) => {
        return {
          url: `pokemons?${params}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetPokemonQuery } = pokemonApi;
