import { HelloButton } from "./HelloButton";
import React, { FC } from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Hello button",
  component: HelloButton,
};

export const HelloButtonStory: FC = () => (
  <HelloButton onClick={action("Click")} />
);
