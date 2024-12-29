import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPokemonRes, PokemonInfiniteList, SelectList } from './searchType';

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
        const params = new URLSearchParams(arg);
        return {
          data: value.data,
          currentQuery: params.get('name') || '',
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
    getPokemonTypesList: builder.query<SelectList[], string>({
      query: () => {
        return {
          url: 'pokemons/types',
          method: 'GET',
        };
      },
      transformResponse: (value: { data: { type: string }[] }) =>
        value.data.map((item) => ({
          value: item.type,
          label: item.type[0].toUpperCase() + item.type.substring(1),
        })),
    }),
    getPokemonShapesList: builder.query<SelectList[], string>({
      query: () => {
        return {
          url: 'pokemons/shapes',
          method: 'GET',
        };
      },
      transformResponse: (value: { data: { shape: string }[] }) =>
        value.data.map((item) => ({
          value: item.shape,
          label: item.shape[0].toUpperCase() + item.shape.substring(1),
        })),
    }),
  }),
});

export const {
  useGetPokemonQuery,
  useGetInfiniteScrollPokemonQuery,
  useGetPokemonTypesListQuery,
  useGetPokemonShapesListQuery,
} = pokemonApi;
