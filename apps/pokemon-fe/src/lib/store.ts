import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import { pokemonApi } from './features/search/searchApi';
import paginationReducer from './features/pagination/paginationSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      search: searchReducer,
      pagination: paginationReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
