import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { setActivePage, setPageNumber } from './paginationSlice';
import type { PaginationState } from './paginationType';

export const usePaginationSelector = () =>
  useSelector.withTypes<RootState>()((state) => state.pagination);

export const usePaginationDispatch = () => {
  const dispatch = useDispatch.withTypes<AppDispatch>()();

  return {
    setPageNumber: (pageNumber: PaginationState['pageNumber']) =>
      dispatch(setPageNumber(pageNumber)),
    setActivePage: (activePage: PaginationState['activePage']) =>
      dispatch(setActivePage(activePage)),
  };
};
