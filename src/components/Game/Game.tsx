import React, { FC } from "react";
import { Field } from "./Field/Field";
import { Settings, GameSettings } from "./Settings/Settings";
import {
  GameContainer,
  SettingsContainer,
  MainContainer,
  ButtonsContainer,
  FieldContainer,
} from "./Game.styles";
import { ImageButton } from "../common/ImageButton/ImageButton";
import SettingsImg from "./assets/settings_svg.svg";
import PlayImg from "./assets/play_pause.svg";
import BackImg from "./assets/back.svg";
import ForwardImg from "./assets/forward.svg";

export interface GameState {
  gameSettings: GameSettings;
  isSettingsVisible: boolean;
  isPlaying: boolean;
}

export class Game extends React.Component<{}, GameState> {
  state = {
    isPlaying: false,
    isSettingsVisible: false,
    gameSettings: {
      height: 200,
      width: 200,
      rowCount: 5,
      columnCount: 5,
      emptyPercent: 0,
      frequency: 1,
    },
  };

  onClickPlayPause = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  onClickSettings = () => {
    this.setState({ isSettingsVisible: true });
  };

  onCancelSettings = () => {
    this.setState({ isSettingsVisible: false });
  };

  onSubmitSettings = (settings: GameSettings) => {
    this.setState({
      gameSettings: settings,
      isSettingsVisible: false,
    });
  };

  render() {
    return (
      <>
        <Settings
          visible={this.state.isSettingsVisible}
          settings={this.state.gameSettings}
          onSubmit={this.onSubmitSettings}
          onCancel={this.onCancelSettings}
        />
        <GameContainer>
          <MainContainer>
            <FieldContainer>
              <Field key="field" {...this.state.gameSettings} />
            </FieldContainer>
            <ButtonsContainer>
              <ImageButton
                src={BackImg}
                type="button"
                disabled={true}
              ></ImageButton>
              <ImageButton
                key="playBtn"
                src={PlayImg}
                type="button"
                onClick={this.onClickPlayPause}
              ></ImageButton>
              <ImageButton
                src={ForwardImg}
                type="button"
                disabled={true}
              ></ImageButton>
            </ButtonsContainer>
          </MainContainer>
          <SettingsContainer>
            <ImageButton
              key="settingsBtn"
              src={SettingsImg}
              type="button"
              onClick={this.onClickSettings}
            ></ImageButton>
          </SettingsContainer>
        </GameContainer>
      </>
    );
  }
}
