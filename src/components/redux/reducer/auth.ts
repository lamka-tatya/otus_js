import { initAuthState } from "../state/authState";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: initAuthState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsChecking(state, action) {
      state.isChecking = action.payload;
    },
  },
});

export const { setUser, setIsChecking } = authSlice.actions;
export default authSlice.reducer;
