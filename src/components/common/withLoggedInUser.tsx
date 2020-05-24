import React, {
  useState,
  useEffect,
  FC,
  ComponentType,
  useCallback,
} from "react";
import { Redirect } from "react-router-dom";

export type Gender = "robot" | "male" | "female";

export const withLoggedInUser = <Props extends object>(
  Comp: ComponentType<Props>
) => (props: Props) => {
  const [isChecking, setIsChecking] = useState(true);
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("");

  const onLogout = useCallback(() => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userGender");
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("userName") ?? "";
    const gender = (localStorage.getItem("userGender") as Gender) ?? "robot";

    setUserName(name);
    setUserGender(gender);
    setIsChecking(false);
  }, []);

  return isChecking || userName ? (
    <Comp
      {...props}
      userName={userName}
      userGender={userGender}
      onLogout={onLogout}
    />
  ) : (
    <Redirect to="/" />
  );
};
