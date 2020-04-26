import React, { FC, Component } from "react";
import { Input } from "./Input/Input";
import { HelloButton } from "./HelloButton/HelloButton";
import { Output } from "./Output/Output";

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
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Input onChange={this.onChangeInput} />
        <HelloButton onClick={this.onClickHelloButton} />
        <Output userName={this.state.userName} />
      </div>
    );
  }
}
