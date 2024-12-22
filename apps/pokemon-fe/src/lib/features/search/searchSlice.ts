import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SearchState } from './searchType';

const initialState: SearchState = {
  active: false,
  queryText: '',
  queryParams: '',
  infiniteBaseQuery: {
    name: '',
    page: 1,
    limit: 16,
  },
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
    setInfinteBaseQuery(
      state,
      action: PayloadAction<Partial<SearchState['infiniteBaseQuery']>>
    ) {
      state.infiniteBaseQuery = {
        ...state.infiniteBaseQuery,
        ...action.payload,
      };
    },
  },
});

export const { setQueryText, setSearchActiveStatus, setInfinteBaseQuery } =
  searchSlice.actions;

export default searchSlice.reducer;
