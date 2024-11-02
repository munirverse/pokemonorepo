import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SearchState = {
  active: boolean;
  queryText: string;
  loading: boolean;
  history: string[];
};

const initialState: SearchState = {
  active: false,
  queryText: '',
  loading: false,
  history: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQueryText(state, action: PayloadAction<SearchState['queryText']>) {
      state.queryText = action.payload;
    },
    activateSearchMode(state) {
      state.active = true;
    },
    deactivateSearchMode(state) {
      state.active = false;
    },
  },
});

export const { setQueryText, activateSearchMode, deactivateSearchMode } =
  searchSlice.actions;
export default searchSlice.reducer;
