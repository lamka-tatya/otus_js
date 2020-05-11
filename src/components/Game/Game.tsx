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
import SettingsImg from "./../../assets/images/settings_svg.svg";
import PlayImg from "./../../assets/images/play_pause.svg";
import BackImg from "./../../assets/images/back.svg";
import ForwardImg from "./../../assets/images/forward.svg";

interface GameState {
  gameSettings: GameSettings;
  settingsVisible: boolean;
  isPlaying: boolean;
}

export class Game extends React.Component<{}, GameState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isPlaying: false,
      settingsVisible: false,
      gameSettings: {
        height: 200,
        width: 200,
        rowCount: 5,
        columnCount: 5,
        emptyPercent: 0,
        frequency: 1,
      },
    };

    this.onSubmitSettings = this.onSubmitSettings.bind(this);
    this.onCancelSettings = this.onCancelSettings.bind(this);
    this.onClickSettings = this.onClickSettings.bind(this);
    this.onClickPlayPause = this.onClickPlayPause.bind(this);
  }

  onClickPlayPause() {
    this.setState({ ...this.state, isPlaying: !this.state.isPlaying });
  }

  onClickSettings() {
    this.setState({ ...this.state, settingsVisible: true });
  }

  onCancelSettings() {
    this.setState({ ...this.state, settingsVisible: false });
  }

  onSubmitSettings(settings: GameSettings) {
    this.setState({
      ...this.state,
      gameSettings: settings,
      settingsVisible: false,
    });
  }

  render() {
    return (
      <>
        <Settings
          visible={this.state.settingsVisible}
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
