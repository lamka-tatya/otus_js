import React from "react";
import { Formik, Form, Field } from "formik";
import {
  FormStyled,
  NameContainer,
  FieldStyled,
  ButtonStyled,
} from "./Start.styles";

export class Start extends React.Component<
  { onSubmit: () => void },
  { name: string }
> {
  render() {
    return (
      <Formik initialValues={{ name: "" }} onSubmit={this.props.onSubmit}>
        <FormStyled>
          <NameContainer>
            <label>Привет, </label>
            <FieldStyled type="text" name="name" />
            <label>!</label>
          </NameContainer>
          <ButtonStyled type="submit">Start</ButtonStyled>
        </FormStyled>
      </Formik>
    );
  }
}
