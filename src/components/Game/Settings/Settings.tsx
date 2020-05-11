import React, { FC } from "react";
import {
  FieldsetStyled,
  FieldStyled,
  FieldsContainer,
  FormStyled,
  ButtonsContainer,
  FieldContainer,
  LabelStyled,
  OverlayStyled,
  OverlayChildrenStyled,
  ImageStyled,
} from "./Settings.styles";
import { Formik } from "formik";
import VArrowsImg from "./../../../assets/images/v_arrows_svg.svg";
import HArrowsImg from "./../../../assets/images/h_arrows_svg.svg";
import CancelImg from "./../../../assets/images/cancel_svg.svg";
import OkImg from "./../../../assets/images/ok_svg.svg";
import { ImageButton } from "../../common/ImageButton/ImageButton";

export interface GameSettings {
  height: number;
  width: number;
  rowCount: number;
  columnCount: number;
  emptyPercent: number;
  frequency: number;
}

const XYSettingsSet: FC<{
  legend: string;
  ySettingName: string;
  xSettngName: string;
}> = ({ legend, ySettingName, xSettngName }) => (
  <FieldsetStyled>
    <legend>{legend}</legend>
    <FieldsContainer>
      <FieldContainer>
        <ImageStyled src={VArrowsImg} />
        <FieldStyled type="number" name={ySettingName} />
      </FieldContainer>
      <FieldContainer>
        <ImageStyled src={HArrowsImg} />
        <FieldStyled type="number" name={xSettngName} />
      </FieldContainer>
    </FieldsContainer>
  </FieldsetStyled>
);

const Overlay: FC<{ children?: JSX.Element }> = ({ children }) => (
  <>
    <OverlayStyled />
    <OverlayChildrenStyled>{children}</OverlayChildrenStyled>
  </>
);

export const Settings: FC<{
  visible: boolean;
  settings: GameSettings;
  onSubmit: (s: GameSettings) => void;
  onCancel: () => void;
}> = ({ visible, settings, onSubmit, onCancel }) => {
  return visible ? (
    <Overlay>
      <Formik initialValues={settings} onSubmit={onSubmit} key="settingsForm">
        <FormStyled>
          <XYSettingsSet
            legend="Размер окна, px"
            ySettingName="height"
            xSettngName="width"
          />
          <XYSettingsSet
            legend="Количество клеток"
            ySettingName="columnCount"
            xSettngName="rowCount"
          />

          <FieldsContainer>
            <FieldContainer>
              <LabelStyled>Частота, сек</LabelStyled>
              <FieldStyled type="number" name="frequency" />
            </FieldContainer>
            <FieldContainer>
              <LabelStyled>% пустых клеток</LabelStyled>
              <FieldStyled type="number" name="emptyPercent" />
            </FieldContainer>
          </FieldsContainer>

          <ButtonsContainer>
            <ImageButton
              type="button"
              onClick={onCancel}
              src={CancelImg}
            ></ImageButton>
            <ImageButton
              type="submit"
              key="submitBtn"
              src={OkImg}
            ></ImageButton>
          </ButtonsContainer>
        </FormStyled>
      </Formik>
    </Overlay>
  ) : (
    <></>
  );
};
