import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { setQueryText, setSearchActiveStatus } from './searchSlice';
import type { SearchState } from './searchType';
import { useGetPokemonQuery } from './searchApi';

export const useSearchSelector = () =>
  useSelector.withTypes<RootState>()((state) => state.search);

export const useSearchDispatch = () => {
  const dispatch = useDispatch.withTypes<AppDispatch>()();

  return {
    setQueryText: (queryText: SearchState['queryText']) =>
      dispatch(setQueryText(queryText)),
    setSearchActiveStatus: (status: SearchState['active']) =>
      dispatch(setSearchActiveStatus(status)),
  };
};

// export query api hook
export { useGetPokemonQuery };
