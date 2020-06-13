import { User } from "@models/User";
import { Gender } from "@models/Gender";

interface AuthService {
  login: (user: User) => void;
  getLoggedInUser: () => User | undefined;
  logout: () => void;
}

class LocalStorageAuthService implements AuthService {
  readonly userNameKey: string = "userName";
  readonly userGenderKey: string = "userGender";

  getLoggedInUser() {
    const name = localStorage.getItem(this.userNameKey) ?? "";
    const gender =
      (localStorage.getItem(this.userGenderKey) as Gender) ?? "robot";

    if (name) {
      return { name, gender } as User;
    }

    return void 0;
  }

  logout() {
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userGenderKey);
  }

  login(user: User) {
    localStorage.setItem(this.userNameKey, user.name);
    localStorage.setItem(this.userGenderKey, user.gender);
  }
}

const localStorageAuth = new LocalStorageAuthService();

export default localStorageAuth;
