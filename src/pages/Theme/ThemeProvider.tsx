import React from "react";
import { useRecoilValue } from "recoil";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeState } from "./ThemeState";

interface ThemeProviderProps {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useRecoilValue(ThemeState);
  const themeConfig = {
    light: {
      primaryColor: "#ffffff",
      secondaryColor: "#000000",
    },
    dark: {
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
    },
    highcontrast: {
      primaryColor: "#0000FF",
      secondaryColor: "#FF9900",
    },
  };
  const selectedTheme = themeConfig[theme];

  return (
    <EmotionThemeProvider theme={selectedTheme}>
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
