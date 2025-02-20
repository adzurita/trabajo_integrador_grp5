import { Routes, Route, useLocation } from "react-router-dom";

import { Home, AdminPage } from "./pages/index";
import { Header, HeaderMobile } from "./components/index";
import "./App.css";

function App() {
  return (
    <>
     {/*  {!location.pathname.startsWith("/admin") && <Header />} */}
      {!location.pathname.startsWith("/admin") && <HeaderMobile />}

      <Routes>
        <Route path="/admin*" element={<AdminPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
