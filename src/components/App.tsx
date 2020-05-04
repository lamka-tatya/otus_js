import React, { FC } from "react";
import { Field } from "./Field/Field";
import { Settings } from "./Settings/Settings";

interface AppState {
  rowCount: number;
  columnCount: number;
  emptyPercent: number;
  height: number;
  width: number;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      rowCount: 5,
      columnCount: 5,
      emptyPercent: 0,
      height: 200,
      width: 200,
    };

    this.onWidthChange = this.onWidthChange.bind(this);
    this.onHeightChange = this.onHeightChange.bind(this);
  }

  onWidthChange(width: number) {
    this.setState({ ...this.state, width });
  }

  onHeightChange(height: number) {
    this.setState({ ...this.state, height });
  }

  render() {
    return (
      <>
        <Settings
          initHeight={this.state.height}
          initWidth={this.state.width}
          onHeightChange={this.onHeightChange}
          onWidthChange={this.onWidthChange}
        />
        <Field key="field" {...this.state} />
      </>
    );
  }
}
