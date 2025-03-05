import { Routes, Route, useLocation } from "react-router-dom";

import { Home, AdminPage } from "./pages/index";
import { Header, HeaderMobile } from "./components/index";
import "./App.css";
import { ProductDetail } from "./pages/detailProduct/detailProduct";
import { Gallery } from "./pages/gallery/Gallery";
import { AuthProvider } from "./context/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      {!location.pathname.startsWith("/admin") && 
        <Header />
      }
      {!location.pathname.startsWith("/admin") && <HeaderMobile />}

      <Routes>
        <Route path="/admin*" element={<AdminPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/gallery" element={<Gallery/>} />
        {/*<Route path="*" element={<NotFoundPage />} />*/}
      </Routes>
    </AuthProvider>
  );
}

export default App;
