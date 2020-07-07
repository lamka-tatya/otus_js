import { initFieldState } from "../state/fieldState";
import { createSlice } from "@reduxjs/toolkit";

const fieldSlice = createSlice({
  name: "field",
  initialState: initFieldState,
  reducers: {
    setField(state, action) {
      state.rows = action.payload;
    },
  },
});

export const { setField } = fieldSlice.actions;
export default fieldSlice.reducer;
