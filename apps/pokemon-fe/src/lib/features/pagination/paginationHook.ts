import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import {
  setActivePage,
  setInfiniteList,
  setPageNumber,
} from './paginationSlice';
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
    setInfiniteList: (list: PaginationState['infiniteList']) =>
      dispatch(setInfiniteList(list)),
  };
};
