import React, { useState, useEffect, ComponentType, useCallback } from "react";
import { Redirect } from "react-router-dom";
import authService, { User } from "@/common/authService";

export const withLoggedInUser = <Props extends object>(
  Comp: ComponentType<Props>
) => (props: Props) => {
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<User>();

  const onLogout = useCallback(() => {
    authService.logout();
  }, []);

  useEffect(() => {
    const loggedUser = authService.getLoggedInUser();
    setUser(loggedUser);
    setIsChecking(false);
  }, []);

  return isChecking || user?.name ? (
    <Comp {...props} user={user} onLogout={onLogout} />
  ) : (
    <Redirect to="/" />
  );
};
