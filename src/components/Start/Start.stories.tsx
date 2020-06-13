import { Start } from ".";
import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Start",
  component: Start,
};

export const StartStory: FC = () => {
  return (
    <BrowserRouter>
      <Start />
    </BrowserRouter>
  );
};
