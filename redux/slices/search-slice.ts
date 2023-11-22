import { City } from "@/types/city";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  query: string;
  results: City[];
}

const initialState: SearchState = {
  query: "tel aviv",
  results: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCityQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setCityResults: (state, action: PayloadAction<City[]>) => {
      state.results = action.payload;
    },
  },
});

export const { setCityQuery, setCityResults } = searchSlice.actions;

export default searchSlice.reducer;
