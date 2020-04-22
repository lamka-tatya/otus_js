import React, { FC } from "react";

export const HelloButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <button style={{ margin: "5px" }} onClick={onClick}>
    Hello!
  </button>
);
