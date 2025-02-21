import { Routes, Route, useLocation } from "react-router-dom";

import { Home, AdminPage } from "./pages/index";
import { Header, HeaderMobile } from "./components/index";
import "./App.css";
import { ProductDetail } from "./components/detailProduct/detailProduct";

function App() {
  const isMobileDevice = () => window.innerWidth <= 768;
  return (
    <>
      {!location.pathname.startsWith("/admin") && 
        <Header />
      }
      {/* {!location.pathname.startsWith("/admin") && <HeaderMobile />} */}

      <Routes>
        <Route path="/admin*" element={<AdminPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/*<Route path="*" element={<NotFoundPage />} />*/}
      </Routes>
    </>
  );
}

export default App;
