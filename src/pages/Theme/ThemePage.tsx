import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useRecoilValue } from "recoil";
import { ThemeState } from "./ThemeState";
import "./ThemePage.scss";

export const ThemePage: React.FC = () => {
  const theme = useRecoilValue(ThemeState);
  const themeClass = theme;
  return (
    <div className={`theme-page ${themeClass}`}>
      <div className={`themeTitle`}>
        <h1>테마 설정</h1>
        <p>
          모두가 코딩을 즐길 수 있는 공간, CodeEasy! 저희 플랫폼은 저시력자와
          일반인 모두가 사용하기 편리한 맞춤형 인터페이스를 제공합니다. 사용자가
          편의대로 다크모드 라이트 모드 및 저시력자를 위한 고대비 모드를
          제공합니다.
        </p>
      </div>
      <div className={`themeSwitch`}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};