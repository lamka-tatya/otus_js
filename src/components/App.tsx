import React, { FC } from "react";
import { Field } from "./Field/Field";
import { Settings, GameSettings } from "./Settings/Settings";

interface AppState {
  gameSettings: GameSettings;
  settingsVisible: boolean;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
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
        <Field key="field" {...this.state.gameSettings} />
      </>
    );
  }
}
