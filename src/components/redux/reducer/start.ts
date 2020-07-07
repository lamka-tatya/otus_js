import { initStartState } from "../state/startState";
import { createSlice } from "@reduxjs/toolkit";

const startSlice = createSlice({
  name: "stert",
  initialState: initStartState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setUserGender(state, action) {
      state.userGender = action.payload;
    },
  },
});

export const { setUserName, setUserGender } = startSlice.actions;
export default startSlice.reducer;
