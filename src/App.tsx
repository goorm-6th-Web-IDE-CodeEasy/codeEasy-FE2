import { RecoilRoot } from "recoil";
import "./App.css";
import { ThemePage } from "./pages/Theme/ThemePage";
import ThemeProvider from "./pages/Theme/ThemeProvider";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <ThemePage />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
