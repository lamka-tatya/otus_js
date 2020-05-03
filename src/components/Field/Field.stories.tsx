import Field from "./Field";
import React, { FC } from "react";

export default {
  title: "Field",
  component: Field,
};

export const FieldStory: FC = () => {
  return <Field rowCount={3} columnCount={3} emptyPercent={0} />;
};
