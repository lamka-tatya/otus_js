import { Gender } from "@models/Gender";

export interface StartState {
  userName: string;
  userGender: Gender;
}

export const initStartState: StartState = {
  userName: "",
  userGender: "robot",
};
