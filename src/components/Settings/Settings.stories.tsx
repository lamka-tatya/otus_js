import { Settings } from "./Settings";
import React, { FC } from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Cell",
  component: Settings,
};

export const SettingsStory: FC = () => {
  return (
    <Settings
      initWidth={50}
      initHeight={50}
      onHeightChange={action("Height changed")}
      onWidthChange={action("Width changed")}
    />
  );
};
