import { Action } from "redux";
import * as actions from "../actions";
import { FieldState, initFieldState } from "../state/fieldState";
import { createReducer } from "@reduxjs/toolkit";

export const field = createReducer<FieldState>(initFieldState, {
  [actions.setField.type]: (state, action) => {
    return {
      ...state,
      field: action.payload,
    };
  },
});
