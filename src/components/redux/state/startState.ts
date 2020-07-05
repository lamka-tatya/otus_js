import { Gender } from "@models/Gender";

export interface StartState {
	userName: string;
	userGender: Gender;
	isGoGame: boolean;
}

export const initStartState: StartState = {
	userName: '',
	userGender: "robot",
	isGoGame: false
};
