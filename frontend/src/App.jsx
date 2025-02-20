import { Routes, Route } from "react-router-dom";

import { Home, Admin } from "./pages/index";
import { Header } from "./components/index";
import "./App.css";
import { ProductDetail } from "./components/detailProduct/detailProduct";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/*<Route path="*" element={<NotFoundPage />} />*/}
      </Routes>
    </>
  );
}

export default App;
