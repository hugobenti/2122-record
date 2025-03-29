import React, { useEffect, useRef, useState } from "react";
import "./main.css";
import Header from "./components/Header/Header";
import { AppProvider } from "./context/AppContext";
import Welcome from "./components/Welcome/Welcome";
import Services from "./components/Services/Services";
import SectionSeparator from "./components/Separator/SectionSeparator";
import Catalog from "./components/Catalog/Catalog";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Footer from "./components/Footer/Footer";
function App() {

  return (
    <div className="max-w-[100vw] overflow-x-hidden">

    <AppProvider>
      <div className="w-0 h-0 absolute">
        <div className="app-background" />
      </div>

      <div className="w-screen ">
        <Header />
        <div className="w-1 h-24" />
        <Welcome />
      </div>

      <Home />

      <SectionSeparator bottomColor="fill-zinc-800" topColor="bg-transparent" />

      <About />

      <SectionSeparator bottomColor="fill-zinc-800" topColor="bg-transparent" />

      <Services />
      <div className="rotate-180">

      <SectionSeparator bottomColor="fill-zinc-800" topColor="bg-transparent" />
      </div>

      <Catalog />

      <Portfolio />

      <Footer />
    </AppProvider>
    </div>
  );
}

export default App;
