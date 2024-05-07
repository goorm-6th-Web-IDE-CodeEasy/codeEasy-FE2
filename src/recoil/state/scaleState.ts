import { atom } from "recoil";

export const scaleState = atom({
  key: "scaleState", // 고유 키
  default: 1, // 기본값 1 (100%)
});
