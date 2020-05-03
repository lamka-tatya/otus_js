import React, { FC } from "react";
import Field from "./Field/Field";

export const App: FC = () => (
  <Field rowCount={5} columnCount={6} emptyPercent={0} />
);
