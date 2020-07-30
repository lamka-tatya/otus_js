import { initFieldState } from "../state/fieldState";
import { createSlice } from "@reduxjs/toolkit";

const fieldSlice = createSlice({
  name: "field",
  initialState: initFieldState,
  reducers: {
    setField(state, action) {
      state.rows = action.payload;
    },
    /* eslint-disable @typescript-eslint/no-empty-function */
    makeCellAlive(state, action) {},
    /* eslint-enable @typescript-eslint/no-empty-function */
  },
});

export const { setField, makeCellAlive } = fieldSlice.actions;
export default fieldSlice.reducer;
