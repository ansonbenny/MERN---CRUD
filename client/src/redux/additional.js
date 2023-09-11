import { createSlice } from "@reduxjs/toolkit";

const additionalSlice = createSlice({
  name: "additional",
  initialState: {
    header: false,
  },
  reducers: {
    setHeader: (state, { payload }) => {
      state.header = payload;
      return state;
    },
  },
});

export const { setHeader } = additionalSlice.actions;

export default additionalSlice.reducer;
