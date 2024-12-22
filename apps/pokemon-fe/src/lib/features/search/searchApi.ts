import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPokemonRes, PokemonInfiniteList } from './searchType';

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
    getInfiniteScrollPokemon: builder.query<PokemonInfiniteList, string>({
      query: (params) => `pokemons?${params}`,
      transformResponse: (value: GetPokemonRes, _, arg) => {
        console.log('arg: ', arg);
        const params = new URLSearchParams(arg);
        return {
          data: value.data,
          currentQuery: params.get('name')!,
          currentPage: +value.pagination.pageNumber || 1,
          hasNextPage: value.pagination.pageTotal > value.pagination.pageNumber,
        };
      },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (newItems.currentQuery !== currentCache.currentQuery) {
          return newItems;
        } else {
          currentCache.currentPage = newItems.currentPage;
          currentCache.hasNextPage = newItems.hasNextPage;
          currentCache.currentQuery = newItems.currentQuery;
          currentCache.data.push(...newItems.data);
        }
      },
      // Refetch when the page arg changes
      forceRefetch: ({ currentArg, previousArg }) => {
        const [currParams, prevParams] = [
          new URLSearchParams(currentArg),
          new URLSearchParams(previousArg),
        ];

        const isRefetch =
          currParams.get('name') !== prevParams.get('name') ||
          currParams.get('page') !== prevParams.get('page');

        return isRefetch;
      },
    }),
  }),
});

export const { useGetPokemonQuery, useGetInfiniteScrollPokemonQuery } =
  pokemonApi;
