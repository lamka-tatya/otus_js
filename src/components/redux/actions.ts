import { User } from "@models/User";
import { SettingsState } from "./state/settingsState";
import { FieldState } from "./state/fieldState";
import { Gender } from "@models/Gender";

export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_GENDER = "SET_USER_GENDER";
export const GO_TO_GAME = "GO_TO_GAME";
export const SET_USER = "SET_USER";
export const SET_IS_CHECKING = "SET_IS_CHECKING";
export const SET_SETTINGS = "SET_SETTINGS";
export const SET_FIELD = "SET_FIELD";

export const SET_IS_PLAYING = "SET_IS_PLAYING";
export const SET_IS_SETTINGS_VISIBLE = "SET_IS_SETTINGS_VISIBLE";
export const SET_IS_RESET = "SET_IS_RESET";
export const SET_USERPIC = "SET_USERPIC";
export const SET_GAME_SETTINGS = "SET_GAME_SETTINGS";
export const LOGOUT = "LOGOUT";

export function setIsPlaying(payload: boolean) {
	return {
	  type: SET_IS_PLAYING,
	  payload,
	};
  }

  export function setIsSettingsVisible(payload: boolean) {
	return {
	  type: SET_IS_SETTINGS_VISIBLE,
	  payload,
	};
  }

  export function setIsReset(payload: boolean) {
	return {
	  type: SET_IS_RESET,
	  payload,
	};
  }

  export function setUserpic(payload: string) {
	return {
	  type: SET_USERPIC,
	  payload,
	};
  }

  export function logout() {
	return {
	  type: LOGOUT,
	};
  }

export function setUserName(payload: string) {
	return {
	  type: SET_USER_NAME,
	  payload,
	};
  }

  export function setUserGender(payload: Gender) {
	return {
	  type: SET_USER_GENDER,
	  payload,
	};
  }

  export function goToGame() {
	return {
	  type: GO_TO_GAME,
	};
  }


export function setUser(payload: User | undefined) {
	return {
	  type: SET_USER,
	  payload,
	};
  }

  export function setIsChecking(payload: boolean) {
	return {
	  type: SET_IS_CHECKING,
	  payload,
	};
  }



  export function setSettings(payload: SettingsState) {
	return {
	  type: SET_SETTINGS,
	  payload,
	};
  }

  export function setField(payload: FieldState) {
	return {
	  type: SET_FIELD,
	  payload,
	};
  }
