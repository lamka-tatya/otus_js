import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { Redirect } from "react-router-dom";
import {
  FormStyled,
  NameContainer,
  FieldStyled,
  GenderContainer,
} from "./Start.styles";
import { ImageButton } from "@/common/ImageButton";
import GameImg from "./assets/game.svg";
import localStorageAuth from "@services/authService";
import { Gender } from "@models/Gender";
import { User } from "@models/User";

export const Start: FC = ({}) => {
  const [isGoGame, setIsGoGame] = useState(false);
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState<Gender>("robot");

  const onSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      localStorageAuth.login({ name: userName, gender: userGender } as User);
      setIsGoGame(true);
    },
    [userName, userGender, setIsGoGame]
  );

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
    const loggedUser = localStorageAuth.getLoggedInUser();
    setUserName(loggedUser?.name ?? "");
    setUserGender(loggedUser?.gender ?? "robot");
  }, []);

  return isGoGame ? (
    <Redirect to="/game" push={true} />
  ) : (
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
