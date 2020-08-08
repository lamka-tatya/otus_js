import { Start } from "./Start";
import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default {
  title: "Start",
  component: Start,
};

export const StartStory: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Start />
      </BrowserRouter>
    </Provider>
  );
};
