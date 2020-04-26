import React, { Component } from "react";
import Field from "./Field/Field";

export class App extends Component {
  render() {
    return <Field rowCount={5} columnCount={6} emptyPercent={0} />;
  }
}
