import React from "react";
import "./main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import CatalogPage from "./pages/CatalogPage";
import ServicesPage from "./pages/ServicesPage";

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/sobre" element={<HomePage />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
