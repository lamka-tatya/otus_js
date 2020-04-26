import React, { FC } from "react";

export const Output: FC<{ userName: string }> = ({ userName }) => (
  <span
    hidden={!userName}
    style={{ margin: "5px" }}
  >{`Hello, ${userName}!`}</span>
);
