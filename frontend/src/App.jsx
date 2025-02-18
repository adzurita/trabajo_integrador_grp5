import { Routes, Route } from "react-router-dom";

import { Home, Admin } from "./pages/index";
import { Header } from "./components/index";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        {/*         <Route path="/recomendaciones" element={<RecomendacionesPage />} />
        <Route path="/explora" element={<ExploraPage />} /> 
        <Route path="*" element={<NotFoundPage />} />*/}
      </Routes>
    </>
  );
}

export default App;
