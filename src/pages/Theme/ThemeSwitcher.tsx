import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { ThemeMode, ThemeState } from "./ThemeState";
import "./ThemeSwitcher.scss";
import 고대비 from "../../assets/Theme/고대비.svg"
import 라이트 from "../../assets/Theme/라이트.svg"
import 다크 from "../../assets/Theme/다크.svg"


const ThemeSwitcher: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useRecoilState(ThemeState); //Recoil 상태와 동기화
  const [checkedTheme, setCheckedTheme] = useState<ThemeMode>(selectedTheme); //테마 상태

  const handleThemeChange = (newTheme: ThemeMode) => {
    setCheckedTheme(newTheme); //테마 업데이트
  };

  const applyTheme = () => {
    setSelectedTheme(checkedTheme); //테마 적용
  };

  return (
    <div className={`themeSwitcher`}>
      <div className={`themeSelect`}>
        <div className={`themeMode`}>
        <img src={라이트} alt="theme" />
          <h2>라이트 모드</h2>
          <p>
            밝고 깨끗한 배경 위에 부드러운 색상의 조합을 사용하여 눈의 피로를
            줄이고 가독성을 높입니다.
          </p>
          <input
            type="radio"
            id="light"
            name="theme"
            value="light"
            checked={checkedTheme === "light"}
            onChange={() => handleThemeChange("light")}
          />
        </div>
        <div className={`themeMode`}>
        <img src={다크} alt="theme" />
          <h2>다크 모드</h2>
          <p>
            눈부심을 최소화하며, 오랜 시간 동안의 작업에 적합하도록
            만들어졌습니다.
          </p>
          <input
            type="radio"
            id="dark"
            name="theme"
            value="dark"
            checked={checkedTheme === "dark"}
            onChange={() => handleThemeChange("dark")}
          />
        </div>
        <div className={`themeMode`}>
        <img src={고대비} alt="theme" />
          <h2>고대비 모드</h2>
          <p>
            강렬한 색상 대비를 사용하여 요소를 뚜렷이 구분하며, 내용을 더욱
            명확하게 전달할 수 있도록 설계되었습니다.
          </p>
          <input
            type="radio"
            id="highcontrast"
            name="theme"
            value="highcontrast"
            checked={checkedTheme === "highcontrast"}
            onChange={() => handleThemeChange("highcontrast")}
          />
        </div>
      </div>
      <button onClick={applyTheme}>적용하기</button>
    </div>
  );
};

export default ThemeSwitcher;
