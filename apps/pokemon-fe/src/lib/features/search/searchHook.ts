import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import {
  setQueryParams,
  setQueryText,
  deactiveSearchMode,
  activateSearchMode,
} from './searchSlice';
import type { SearchState } from './searchType';
import { useGetPokemonQuery } from './searchApi';

export const useSearchSelector = () =>
  useSelector.withTypes<RootState>()((state) => state.search);

export const useSearchDispatch = () => {
  const dispatch = useDispatch.withTypes<AppDispatch>()();

  return {
    setQueryText: (queryText: SearchState['queryText']) =>
      dispatch(setQueryText(queryText)),
    setQueryParams: (queryText: SearchState['queryParams']) =>
      dispatch(setQueryParams(queryText)),
    deactiveSearchMode: () => dispatch(deactiveSearchMode()),
    activateSearchMode: () => dispatch(activateSearchMode()),
  };
};

// export query api hook
export { useGetPokemonQuery };
