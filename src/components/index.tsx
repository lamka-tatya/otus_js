import React, { FC } from "react";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import { Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" exact>
        <StartScreen />
      </Route>
      <Route path="/game">
        <GameScreen />
      </Route>
    </BrowserRouter>
  </Provider>
);
