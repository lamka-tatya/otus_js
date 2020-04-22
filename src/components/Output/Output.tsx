import React, { FC } from "react";

export const Output: FC<{ userName: string }> = ({ userName }) => (
  <>
    {userName && <span style={{ margin: "5px" }}>{`Hello, ${userName}!`}</span>}
  </>
);
