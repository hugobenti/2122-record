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
  const [backgroundPosition, setBackgroundPosition] = useState("center 0");

  // const handleScroll = () => {
  //   // Pega a quantidade de scroll vertical
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //   const windowHeight = window.innerHeight;
  //   const documentHeight = document.documentElement.scrollHeight;

  //   // Calcula a posição do background com base no scroll
  //   const scrollPercent =
  //     ((scrollTop * 1.25) / (documentHeight - windowHeight)) * 100;
  //   const yPos = Math.min(scrollPercent, 100); // Limita em 100% para não extrapolar

  //   // Atualiza a posição do background
  //   setBackgroundPosition(`center ${yPos}%`);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   // Remove o event listener quando o componente desmontar
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
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
  );
}

export default App;
