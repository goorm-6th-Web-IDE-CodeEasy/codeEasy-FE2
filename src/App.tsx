import { RecoilRoot } from "recoil";
import { ThemePage } from "./pages/Theme/ThemePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Layout/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/register";
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/theme" element={<ThemePage />} />
          </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
