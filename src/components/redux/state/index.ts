import { FieldState, initFieldState } from "./fieldState";
import { initAuthState, AuthState } from "./authState";
import { StartState, initStartState } from "./startState";
import { initGameState, GameState } from "./gameState";

export interface AppState {
  start: StartState;
  auth: AuthState;
  game: GameState;
  field: FieldState;
}

export const initAppState: AppState = {
  start: initStartState,
  auth: initAuthState,
  game: initGameState,
  field: initFieldState,
};
