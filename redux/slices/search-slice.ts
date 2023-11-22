import { City } from "@/types/city";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  query: string;
  location: City | null;
  showDropdown: boolean;
  suggestions: City[];
  isFetchingSuggestions: boolean;
  isFetchingLocation: boolean;
  errorSuggestions: string;
  errorLocation: string;
}

const initialState: SearchState = {
  query: "",
  location: null,
  showDropdown: false,
  suggestions: [],
  isFetchingSuggestions: false,
  isFetchingLocation: false,
  errorSuggestions: "",
  errorLocation: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCityQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setLocation: (state, action: PayloadAction<City>) => {
      state.location = action.payload;
    },
    setShowDropdown: (state) => {
      state.showDropdown = !state.showDropdown;
    },
    setSuggestions: (state, action: PayloadAction<City[]>) => {
      state.suggestions = action.payload;
      state.showDropdown = action.payload.length > 0;
    },
    resetSuggestions: (state) => {
      state.suggestions = [];
      state.showDropdown = false;
    },
    setIsFetchingSuggestions: (state, action: PayloadAction<boolean>) => {
      state.isFetchingSuggestions = action.payload;
    },
    setIsFetchingLocation: (state, action: PayloadAction<boolean>) => {
      state.isFetchingLocation = action.payload;
    },
    setErrorSuggestions: (state, action: PayloadAction<string>) => {
      state.errorSuggestions = action.payload;
    },
    setErrorLocation: (state, action: PayloadAction<string>) => {
      state.errorLocation = action.payload;
    },
  },
});

export const {
  setCityQuery,
  setLocation,
  setShowDropdown,
  setSuggestions,
  resetSuggestions,
  setIsFetchingSuggestions,
  setIsFetchingLocation,
  setErrorSuggestions,
  setErrorLocation,
} = searchSlice.actions;

export default searchSlice.reducer;
