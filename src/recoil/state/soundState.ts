import { atom } from "recoil";

export const soundState = atom({
  key: "soundState", // 고유 키값
  default: true, // 기본값 (볼륨 켜짐)
});
