import React, { FC } from "react";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import { Route, BrowserRouter } from "react-router-dom";

export const App: FC = () => (
  <BrowserRouter>
    <Route path="/" exact>
      <StartScreen />
    </Route>
    <Route path="/game">
      <GameScreen />
    </Route>
  </BrowserRouter>
);
