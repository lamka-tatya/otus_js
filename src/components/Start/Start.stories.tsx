import Start from "./Start";
import React, { FC } from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Start",
  component: Start,
};

export const StartStory: FC = () => {
  return <Start />;
};
