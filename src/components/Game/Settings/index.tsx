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
import VArrowsImg from "./assets/v_arrows_svg.svg";
import HArrowsImg from "./assets/h_arrows_svg.svg";
import CancelImg from "./assets/cancel_svg.svg";
import OkImg from "./assets/ok_svg.svg";
import { AppState } from "@/redux/state";
import { ImageButton } from "@/common/ImageButton";
import { connect } from "react-redux";
import { SettingsState } from "@/redux/state/settingsState";
import { setSettings, setIsSettingsVisible } from "@/redux/actions";

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

const Overlay: FC = ({ children }) => (
  <>
    <OverlayStyled />
    <OverlayChildrenStyled>{children}</OverlayChildrenStyled>
  </>
);

const SettingsInternal: FC<{
  visible: boolean;
  settings: SettingsState;
  setSettings: (s: SettingsState) => void;
  setIsSettingsVisible: (x: boolean) => void;
}> = ({ visible, settings, setSettings, setIsSettingsVisible }) => {
	const onSubmitSettings = (settings: SettingsState) => {
		setSettings(settings);
		setIsSettingsVisible(false);
	  };

  return visible ? (
    <Overlay>
      <Formik
        initialValues={settings}
        onSubmit={onSubmitSettings}
        key="settingsForm"
      >
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
              <LabelStyled>max % заполненности</LabelStyled>
              <FieldStyled type="number" name="fillingPercent" />
            </FieldContainer>
          </FieldsContainer>

          <ButtonsContainer>
            <ImageButton
              type="button"
              onClick={() => setIsSettingsVisible(false)}
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
  ) : null;
};

const mapStateFromProps = (state: AppState) => ({
  settings: state.settings,
  visible: state.game.isSettingsVisible,
});

export const Settings = connect(mapStateFromProps, { setSettings, setIsSettingsVisible })(
  SettingsInternal
);
