import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import {
  setInfinteBaseQuery,
  setQueryText,
  setSearchActiveStatus,
} from './searchSlice';
import type { SearchState } from './searchType';
import {
  useGetPokemonQuery,
  useGetInfiniteScrollPokemonQuery,
  useGetPokemonTypesListQuery,
  useGetPokemonShapesListQuery,
} from './searchApi';

export const useSearchSelector = () =>
  useSelector.withTypes<RootState>()((state) => state.search);

export const useSearchDispatch = () => {
  const dispatch = useDispatch.withTypes<AppDispatch>()();

  return {
    setQueryText: (queryText: SearchState['queryText']) =>
      dispatch(setQueryText(queryText)),
    setSearchActiveStatus: (status: SearchState['active']) =>
      dispatch(setSearchActiveStatus(status)),
    setInfinteBaseQuery: (payload: Partial<SearchState['infiniteBaseQuery']>) =>
      dispatch(setInfinteBaseQuery(payload)),
  };
};

// export query api hook
export {
  useGetPokemonQuery,
  useGetInfiniteScrollPokemonQuery,
  useGetPokemonTypesListQuery,
  useGetPokemonShapesListQuery,
};
