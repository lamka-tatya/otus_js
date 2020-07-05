import { Settings } from ".";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { setIsSettingsVisible } from "@/redux/actions";

export default {
  title: "Settings",
  component: Settings,
};

export const SettingsStory: FC = () => {
  store.dispatch(setIsSettingsVisible(true));
  return (
    <Provider store={store}>
      <Settings />
    </Provider>
  );
};
