import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PaginationState } from './paginationType';

const initialState: PaginationState = {
  pageNumber: 8,
  activePage: 1,
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
  },
});

export const { setPageNumber, setActivePage } = paginationSlice.actions;
export default paginationSlice.reducer;
