import { takeEvery, put } from "redux-saga/effects";
import { setUser } from "../reducer/auth";
import Avatars, { SpriteCollection } from "@dicebear/avatars";

import { default as spritesMale } from "@dicebear/avatars-male-sprites";
import { default as spritesFemale } from "@dicebear/avatars-female-sprites";
import { default as spritesBottts } from "@dicebear/avatars-bottts-sprites";
import { setUserpic } from "../reducer/game";

export function* getUserpic({ payload }: ReturnType<typeof setUser>) {
  let sprite: SpriteCollection | undefined = undefined;
  switch (payload?.gender) {
    case "robot":
      sprite = spritesBottts;
      break;
    case "male":
      sprite = spritesMale;
      break;
    case "female":
      sprite = spritesFemale;
      break;
  }

  const userPicSvg =
    !!sprite && payload?.name
      ? new Avatars(sprite, { base64: true }).create(payload.name)
      : "";

  yield put(setUserpic(userPicSvg));
}

export function* userpicSaga() {
  yield takeEvery(setUser.type, getUserpic);
}
