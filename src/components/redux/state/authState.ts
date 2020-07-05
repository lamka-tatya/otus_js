import { User } from "@models/User";

export interface AuthState {
	user?: User;
	isChecking: boolean;
}
export const initAuthState: AuthState = {
	user: undefined,
	isChecking: true
};
