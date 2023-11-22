import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  metric: boolean;
}

const initialState: UiState = {
  metric: true,
};

export const searchSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTempMode: (state) => {
      state.metric = !state.metric;
    },
  },
});

export const { toggleTempMode } = searchSlice.actions;

export default searchSlice.reducer;
