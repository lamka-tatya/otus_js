import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FormStyled, NameContainer, FieldStyled } from "./Start.styles";
import { ImageButton } from "@/ImageButton/ImageButton";
import GameImg from "./assets/game.svg";

const Start: FC<RouteComponentProps> = ({ history }) => {
  const [userName, setUserName] = useState<string>("");

  const onSubmit = useCallback(() => {
    localStorage.setItem("userName", userName);
    history.push("game");
  }, [userName]);

  const onChangeName = useCallback(
    (e: ChangeEvent) => {
      setUserName((e.target as HTMLInputElement).value);
    },
    [setUserName]
  );

  useEffect(() => {
    setUserName(localStorage.getItem("userName") ?? "");
  }, []);

  return (
    <FormStyled name="startForm" onSubmit={onSubmit}>
      <NameContainer>
        <label>Привет, </label>
        <FieldStyled
          type="text"
          name="userName"
          value={userName}
          onChange={onChangeName}
        />
      </NameContainer>
      <ImageButton
        title="Let's play!"
        type="submit"
        src={GameImg}
      ></ImageButton>
    </FormStyled>
  );
};

export default withRouter(Start);
