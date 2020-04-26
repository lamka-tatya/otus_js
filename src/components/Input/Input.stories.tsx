import { Input } from "./Input";
import React, { FC } from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Input",
  component: Input,
};

export const InputStory: FC = () => <Input onChange={action("Change")} />;
