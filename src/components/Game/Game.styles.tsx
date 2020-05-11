import styled from "@emotion/styled";

export const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 95%;
`;

export const FieldContainer = styled.div`
  display: flex;
  height: 100%;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-radius: 0 0 20px 0;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;
