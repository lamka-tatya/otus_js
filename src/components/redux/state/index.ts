import { User } from "@models/User";
import { GameSettingsState, initGameSettingsState } from "./gameSettingsState";
import { FieldState, initFieldState } from "./fieldState";

export interface GameState {
  user?: User;
  gameSettings: GameSettingsState;
  field: FieldState;
}

export const initGameState: GameState = {
  user: undefined,
  gameSettings: initGameSettingsState,
  field: initFieldState,
};
