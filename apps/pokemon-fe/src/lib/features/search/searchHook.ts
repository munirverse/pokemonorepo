import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import {
  activateSearchMode,
  deactivateSearchMode,
  setQueryText,
} from './searchSlice';
import type { SearchState } from './searchType';

export const useSearchSelector = () =>
  useSelector.withTypes<RootState>()((state) => state.search);

export const useSearchDispatch = () => {
  const dispatch = useDispatch.withTypes<AppDispatch>()();

  return {
    setQueryText: (queryText: SearchState['queryText']) =>
      dispatch(setQueryText(queryText)),
    activateSearchMode: () => dispatch(activateSearchMode()),
    deactivateSearchMode: () => dispatch(deactivateSearchMode()),
  };
};
