import * as actions from "../actions";
import { initSettingsState, SettingsState } from "../state/settingsState";
import { createReducer } from "@reduxjs/toolkit";

export const settings = createReducer<SettingsState>(initSettingsState, {
  [actions.setSettings.type]: (_, action) => action.payload,
});
