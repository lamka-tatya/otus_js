import styled from "@emotion/styled";
import { Formik, Form, Field } from "formik";

export const FormStyled = styled(Form)`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: MONOSPACE;
  font-size: 1.5rem;
`;

export const NameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FieldStyled = styled(Field)`
  font-family: inherit;
  font-size: inherit;
  padding: 0 5px;
  margin-left: 1rem;
`;

export const ButtonStyled = styled.button`
  background: #d0cece;
  border-radius: 7px;
  cursor: pointer;
  outline: none;
  padding: 0.5rem;
  font-family: inherit;
  font-size: inherit;
`;
