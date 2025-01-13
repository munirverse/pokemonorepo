import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPokemonRes, PokemonInfiniteList, SelectList } from './searchType';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/data/api' }),
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
          currentTypes: params.get('types') || '',
          currentShape: params.get('shape') || '',
          hasNextPage: value.pagination.pageTotal > value.pagination.pageNumber,
        };
      },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        const isNotMerge =
          newItems.currentQuery !== currentCache.currentQuery ||
          newItems.currentTypes !== currentCache.currentTypes ||
          newItems.currentShape !== currentCache.currentShape;

        if (isNotMerge) {
          return newItems;
        } else {
          currentCache.currentPage = newItems.currentPage;
          currentCache.hasNextPage = newItems.hasNextPage;
          currentCache.currentQuery = newItems.currentQuery;
          currentCache.currentTypes = newItems.currentTypes;
          currentCache.currentShape = newItems.currentShape;
          currentCache.data.push(...newItems.data);
        }
      },
      // Refetch when the page arg changes
      forceRefetch: ({ currentArg, previousArg }) => {
        const [currParams, prevParams] = [
          new URLSearchParams(currentArg),
          new URLSearchParams(previousArg),
        ];

        console.log(currentArg);

        const isRefetch =
          currParams.get('name') !== prevParams.get('name') ||
          currParams.get('page') !== prevParams.get('page') ||
          currParams.get('types') !== prevParams.get('types') ||
          currParams.get('shape') !== prevParams.get('shape');

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
