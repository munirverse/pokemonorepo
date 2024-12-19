import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PaginationState } from './paginationType';

const initialState: PaginationState = {
  pageNumber: 8,
  activePage: 1,
  infiniteList: [],
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageNumber(state, action: PayloadAction<PaginationState['pageNumber']>) {
      state.pageNumber = action.payload;
    },
    setActivePage(state, action: PayloadAction<PaginationState['activePage']>) {
      state.activePage = action.payload;
    },
    setInfiniteList(
      state,
      action: PayloadAction<PaginationState['infiniteList']>
    ) {
      state.infiniteList = action.payload;
    },
  },
});

export const { setPageNumber, setActivePage, setInfiniteList } =
  paginationSlice.actions;
export default paginationSlice.reducer;
