import React, { useEffect, useRef, useState } from "react";
import "./main.css";
import Header from "./components/Header/Header";
import { AppProvider } from "./context/AppContext";
import Welcome from "./components/Welcome/Welcome";
import Services from "./components/Services/Services";
import SectionSeparator from "./components/Separator/SectionSeparator";
import Catalog from "./components/Catalog/Catalog";
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
      <div className="w-screen bg-stone-700">
        <Header />
        <div className="w-1 h-24" />
        <Welcome />
        {/* <div className="img-card" style={{ backgroundPosition }}>
          <div className="relative bg-[#00000044] w-48 h-72 top-[10%] left-[10%] rounded-md p-4">
            <p className="text-neutral-100">Alguma coisa sei la</p>
          </div>
          </div> */}
      </div>
      <SectionSeparator  bottomColor="fill-stone-900" topColor="bg-stone-700" />
      <Services />
      <SectionSeparator  bottomColor="fill-stone-700" topColor="bg-stone-900" />
      <Catalog />
    </AppProvider>
  );
}

export default App;
