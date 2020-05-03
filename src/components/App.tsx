import React, { FC } from "react";
import { Field } from "./Field/Field";

interface AppState {
  rowCount: number;
  columnCount: number;
  emptyPercent: number;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      rowCount: 5,
      columnCount: 5,
      emptyPercent: 0,
    };
  }

  render() {
    return (
      <Field
        rowCount={this.state.rowCount}
        columnCount={this.state.columnCount}
        emptyPercent={this.state.emptyPercent}
      />
    );
  }
}
