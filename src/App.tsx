import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./main.css";
import YoutubeEmbed from "./components/YoutubeEmbed";
import Header from "./components/Header/Header";
import polvo from "./assets/polvo.png";
function App() {
  const aboutSubtitle = useRef<HTMLDivElement>(null);
  const teste = useRef<HTMLDivElement>(null);
  const [animations, setAnimations] = useState({
    aboutSubtitle: false,
    teste: false,
  });

  const isAnimating = useRef({ aboutSubtitle: false, teste: false }); // Flag para animações

  type AnimationKeys = "aboutSubtitle" | "teste";

  const handleShowAnimation = (id: AnimationKeys) => {
    if (isAnimating.current[id]) return; // Evita chamadas duplicadas
    isAnimating.current[id] = true; // Marca como animando

    setAnimations((prev) => ({ ...prev, [id]: true }));
   
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(entry.isIntersecting, entry.target.id);
          if (entry.isIntersecting) {
            handleShowAnimation(entry.target.id as AnimationKeys);
          } else {
            // Se o elemento sair da viewport, redefina a animação
            const id = entry.target.id as AnimationKeys;
            if (animations[id]) {
              setAnimations((prev) => ({ ...prev, [id]: false }));
              isAnimating.current[id] = false; // Reseta o flag
            }
          }
        });
      },
      { threshold: 0 }
    ); // Ajuste o threshold conforme necessário

    if (aboutSubtitle.current) {
      observer.observe(aboutSubtitle.current);
    }

    if (teste.current) {
      observer.observe(teste.current);
    }

    return () => {
      if (aboutSubtitle.current) {
        observer.unobserve(aboutSubtitle.current);
      }
      if (teste.current) {
        observer.unobserve(teste.current);
      }
    };
  }, []); // Apenas a primeira renderização



  const [backgroundPosition, setBackgroundPosition] = useState("center 0");

  const handleScroll = () => {
    // Pega a quantidade de scroll vertical
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Calcula a posição do background com base no scroll
    const scrollPercent = (scrollTop*1.25 / (documentHeight - windowHeight)) * 100;
    const yPos = Math.min(scrollPercent, 100); // Limita em 100% para não extrapolar

    // Atualiza a posição do background
    setBackgroundPosition(`center ${yPos}%`);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Remove o event listener quando o componente desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-screen h-full bg-stone-700">
      <Header />
      {/* <div className="w-full h-1">
        <img src={polvo} />
      </div> */}
      <div className="w-1 h-24" />

      <div className="flex justify-center items-end gap-4 mt-16 mb-12 ">
        <p className={`extra-large-title animate-all ${animations.aboutSubtitle? `text-stone-200`:`text-stone-50`}`}>2122</p>
        <div className="max-w-[40%] overflow-hidden flex items-start" >
          <div
            className={`large-text uppercase text-stone-300 mb-1 animate-all duration-1000 ${
              animations.aboutSubtitle
                ? `translate-x-0 opacity-100`
                : `-translate-x-3/4 opacity-0`
            }`}
            ref={aboutSubtitle}
            id="aboutSubtitle"
          >
            Onde o som
            <br />
            encontra sua essência
          </div>
        </div>
      </div>


      <div    className="img-card"
      style={{ backgroundPosition }}></div>
      {/* <div className="flex w-full justify-center">
        <YoutubeEmbed embedId="IwQ2eFQwdoE" />
      </div> */}
 
     
      <div
        className={`large-text uppercase text-stone-400 mb-1 animate-all duration-1000 ${
          animations.teste ? `translate-x-0`:`-translate-x-full` 
        }`}
        id="teste"
        ref={teste}
      >
        teste teste teste teste teste teste teste
        teste teste teste teste teste teste teste
        teste teste teste teste teste teste teste
        teste teste teste teste teste teste teste
        teste teste teste teste teste teste teste
      </div>
      <div className="h-80">A</div>
    </div>
  );
}

export default App;
