import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SearchState } from './searchType';

const initialState: SearchState = {
  active: false,
  queryText: '',
  queryParams: '',
  history: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQueryText(state, action: PayloadAction<SearchState['queryText']>) {
      state.queryText = action.payload;
    },
    setQueryParams(state, action: PayloadAction<SearchState['queryParams']>) {
      state.queryParams = action.payload;
      state.history.push(action.payload);
    },
  },
});

export const { setQueryText, setQueryParams } = searchSlice.actions;
export default searchSlice.reducer;
