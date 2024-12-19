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
    setSearchActiveStatus(state, action: PayloadAction<SearchState['active']>) {
      state.active = action.payload;
    },
  },
});

export const { setQueryText, setSearchActiveStatus } = searchSlice.actions;

export default searchSlice.reducer;
