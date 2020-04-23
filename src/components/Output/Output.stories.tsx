import { Output } from "./Output";
import React, { FC } from "react";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: "Output",
  component: Output,
  decorators: [withKnobs],
};

export const OutputStory: FC = () => {
  const userName = text("UserName", "Name");
  return <Output userName={userName} />;
};
