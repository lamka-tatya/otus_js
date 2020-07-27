import { initStartState } from "./startState";
import { createSlice } from "@reduxjs/toolkit";

export const startSlice = createSlice({
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

export const { reducer, actions } = startSlice;
