import * as actions from "../actions";
import { FieldState, initFieldState } from "../state/fieldState";
import { createReducer } from "@reduxjs/toolkit";

export const field = createReducer<FieldState>(initFieldState, {
  [actions.setField.type]: (state, action) => {
    state.rows = action.payload;
    return state;
  },
});
