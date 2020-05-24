import { Start } from "./Start";
import React, { FC } from "react";
import { action } from "@storybook/addon-actions";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Start",
  component: Start,
};

export const StartStory: FC = () => {
  return (
    <BrowserRouter>
      <Start />
    </BrowserRouter>
  );
};
