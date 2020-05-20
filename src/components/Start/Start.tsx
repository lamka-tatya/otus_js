import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  FormStyled,
  NameContainer,
  FieldStyled,
  GenderContainer,
} from "./Start.styles";
import { ImageButton } from "@/ImageButton/ImageButton";
import GameImg from "./assets/game.svg";

export type Gender = "robot" | "male" | "female";

const Start: FC<RouteComponentProps> = ({ history }) => {
  const [userName, setUserName] = useState<string>("");
  const [userGender, setUserGender] = useState<Gender>("robot");

  const onSubmit = useCallback(() => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userGender", userGender);
    history.push("game");
  }, [userName, userGender]);

  const onChangeName = useCallback(
    (e: ChangeEvent) => {
      setUserName((e.target as any).value);
    },
    [setUserName]
  );

  const onChangeGender = useCallback(
    (e: ChangeEvent) => {
      setUserGender((e.target as any).value as Gender);
    },
    [setUserGender]
  );

  useEffect(() => {
    setUserName(localStorage.getItem("userName") ?? "");
    setUserGender(localStorage.getItem("userGender") as Gender);
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
      <GenderContainer>
        <input
          type="radio"
          checked={userGender === "male"}
          value="male"
          name="gender"
          onChange={onChangeGender}
        />{" "}
        М
        <input
          type="radio"
          checked={userGender === "female"}
          value="female"
          name="gender"
          onChange={onChangeGender}
        />{" "}
        Ж
        <input
          type="radio"
          checked={userGender === "robot"}
          value="robot"
          name="gender"
          onChange={onChangeGender}
        />{" "}
        Нет
      </GenderContainer>
      <ImageButton
        title="Let's play!"
        type="submit"
        src={GameImg}
      ></ImageButton>
    </FormStyled>
  );
};

export default withRouter(Start);
