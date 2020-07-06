import { User } from "@models/User";
import { SettingsState } from "./state/settingsState";
import { FieldState } from "./state/fieldState";
import { Gender } from "@models/Gender";
import { createAction } from "@reduxjs/toolkit";

export const setIsPlaying = createAction<boolean>("SET_IS_PLAYING");
export const setIsSettingsVisible = createAction<boolean>(
  "SET_IS_SETTINGS_VISIBLE"
);
export const setIsReset = createAction<boolean>("SET_IS_RESET");
export const setUserpic = createAction<string>("SET_USERPIC");
export const logout = createAction("LOGOUT");
export const setUserName = createAction<string>("SET_USER_NAME");
export const setUserGender = createAction<Gender>("SET_USER_GENDER");
export const goToGame = createAction("GO_TO_GAME");
export const setUser = createAction<User | undefined>("SET_USER");
export const setIsChecking = createAction<boolean>("SET_IS_CHECKING");
export const setSettings = createAction<SettingsState>("SET_SETTINGS");
export const setField = createAction<FieldState>("SET_FIELD");
