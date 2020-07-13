import { takeEvery, put } from "redux-saga/effects";
import { setUser } from "../reducer/auth";
import Avatars, { SpriteCollection } from "@dicebear/avatars";

import { default as spritesMale } from "@dicebear/avatars-male-sprites";
import { default as spritesFemale } from "@dicebear/avatars-female-sprites";
import { default as spritesBottts } from "@dicebear/avatars-bottts-sprites";
import { setUserpic } from "../reducer/game";

export function* getUserpic({ payload }: ReturnType<typeof setUser>) {
  const { gender, name } = payload;
  const spriteHandler: any = {
    robot: spritesBottts,
    male: spritesMale,
    female: spritesFemale,
  };

  const sprite: SpriteCollection | undefined =
    spriteHandler[gender] ?? undefined;

  let userPicSvg = "";
  if (sprite && name) {
    userPicSvg = new Avatars(sprite, { base64: true }).create(name);
  }

  yield put(setUserpic(userPicSvg));
}

export function* userpicSaga() {
  yield takeEvery(setUser.type, getUserpic);
}
