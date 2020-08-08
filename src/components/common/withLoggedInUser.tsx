import React, { useEffect, ComponentType, useCallback, FC } from "react";
import { Redirect } from "react-router-dom";
import localStorageAuth from "@services/authService";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppState } from "@/redux/store";
import { setUser, setIsChecking } from "@/redux/reducer/auth";
import { logout } from "@/redux/reducer/game";

const withLoggedInUserWrapper = <Props extends object>(
  Comp: ComponentType<Props>
) => (props: Props) => {
  const {
    user,
    isChecking,
    logout,
    setUser,
    setIsChecking,
    ...rest
  } = props as any;

  const onLogoutCallback = useCallback(() => {
    localStorageAuth.logout();
  }, []);

  useEffect(() => {
    const loggedUser = localStorageAuth.getLoggedInUser();
    setUser(loggedUser);
    setIsChecking(false);

    if (!isChecking && !user?.name) {
      logout();
    }
  }, []);

  return isChecking || user?.name ? (
    <Comp onLogout={onLogoutCallback} {...rest} />
  ) : (
    <Redirect to="/" />
  );
};

const mapStateFromProps = (state: AppState, ownProps: any) => ({
  isChecking: state.auth.isChecking,
  user: state.auth.user,
  ...ownProps,
});

export const withLoggedInUser = compose(
  connect(mapStateFromProps, { logout, setUser, setIsChecking }),
  withLoggedInUserWrapper
) as <Props extends object>(
  Comp: ComponentType<Props>
) => (props: Props) => JSX.Element;
