import { Settings } from "./Settings";
import React, { FC } from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Settings",
  component: Settings,
};

export const SettingsStory: FC = () => {
  return (
    <Settings
      visible={true}
      settings={{
        height: 50,
        width: 50,
        rowCount: 5,
        columnCount: 5,
        emptyPercent: 0,
        frequency: 1,
      }}
      onSubmit={action("Submit")}
      onCancel={action("Cancel")}
    />
  );
};
