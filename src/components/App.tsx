import React, { FC } from "react";
import { Field } from "./Field/Field";

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
  }

  render() {
    return <Field {...this.state} />;
  }
}
