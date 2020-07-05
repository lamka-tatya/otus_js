export interface GameState {
	isPlaying: boolean;
	isSettingsVisible: boolean;
	isReset: boolean;
	userpic: string;
	isLogout: boolean;
}

export const initGameState: GameState = {
	isPlaying: false,
	isSettingsVisible: false,
	isReset: false,
	userpic: '',
	isLogout: false,
};
