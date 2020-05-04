import { Field } from "./Field";
import React, { FC } from "react";
import { withKnobs, number } from "@storybook/addon-knobs";

export default {
  title: "Field",
  component: Field,
  decorators: [withKnobs],
};

export const FieldStory: FC = () => {
  const columnsCount = number("Columns count", 3);
  const rowsCount = number("Rows count", 3);
  const width = number("Width", 150);
  const height = number("Height", 150);
  return (
    <Field
      height={height}
      width={width}
      rowCount={rowsCount}
      columnCount={columnsCount}
      emptyPercent={0}
    />
  );
};
