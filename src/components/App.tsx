import React, { FC, Component } from "react";
import { Input } from "./Input/Input";
import { HelloButton } from "./HelloButton/HelloButton";
import { Output } from "./Output/Output";
import Field from "./Field/Field";

export class App extends Component {
  constructor(props: any) {
    super(props);
    this.onClickHelloButton = this.onClickHelloButton.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }
  state = {
    userName: "",
  };

  inputValue = "";

  onClickHelloButton() {
    this.setState({ userName: this.inputValue });
  }

  onChangeInput(inputValue: string) {
    this.inputValue = inputValue;
  }

  render() {
    return <Field rowCount={5} columnCount={6} emptyPercent={0} />;
  }
}
