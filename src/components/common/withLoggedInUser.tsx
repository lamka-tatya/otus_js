import React, { useState, useEffect, ComponentType, useCallback } from "react";
import { Redirect } from "react-router-dom";
import localStorageAuth from "@services/authService";
import { User } from "@/redux/state";

export const withLoggedInUser = <Props extends object>(
  Comp: ComponentType<Props>
) => (props: Props) => {
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<User>();

  const onLogout = useCallback(() => {
    localStorageAuth.logout();
  }, []);

  useEffect(() => {
    const loggedUser = localStorageAuth.getLoggedInUser();
    setUser(loggedUser);
    setIsChecking(false);
  }, []);

  return isChecking || user?.name ? (
    <Comp {...props} user={user} onLogout={onLogout} />
  ) : (
    <Redirect to="/" />
  );
};
