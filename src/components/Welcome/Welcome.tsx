import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import welcomeArray from "../../content/welcome.json";

const Welcome = () => {
  const { welcomeRef } = useAppContext();
  const [welcomeText, setWelcomeText] = useState("");
  const [animationState, setAnimationState] = useState<"visible" | "exiting" | "entering">("visible");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);
  const [isInView, setIsInView] = useState<boolean>(true);

  // Configurações de tempo (em milissegundos)
  const exitDuration = 1000; // Duração da animação de saída
  const enterDuration = 1000; // Duração da animação de entrada
  const cycleDuration = 5000; // Intervalo total para atualizar a mensagem

  // Atualiza a mensagem escolhendo aleatoriamente uma nova frase
  const updatePhrase = () => {
    const index = Math.floor(Math.random() * welcomeArray.length);
    setWelcomeText(welcomeArray[index]);
  };

  // Ciclo de animação somente quando o componente estiver na viewport
  useEffect(() => {
    if (!isInView) return; // Se não estiver visível, não cria o ciclo
    // Define a mensagem inicial
    updatePhrase();

    const cycleInterval = setInterval(() => {
      // Inicia a animação de saída
      setAnimationState("exiting");
      setTimeout(() => {
        // Atualiza a mensagem enquanto ela está fora de vista
        updatePhrase();
        // Inicia a animação de entrada
        setAnimationState("entering");
        setTimeout(() => {
          // Finaliza a transição, mantendo a mensagem visível
          setAnimationState("visible");
        }, enterDuration);
      }, exitDuration);
    }, cycleDuration);

    return () => clearInterval(cycleInterval);
  }, [isInView]);

  // Verifica se é mobile e atualiza o estado conforme o redimensionamento da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Usa IntersectionObserver para verificar se o componente está visível na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );

    if (welcomeRef.current) {
      observer.observe(welcomeRef.current);
    }

    return () => observer.disconnect();
  }, [welcomeRef]);

  // Função para inserir uma quebra de linha na mensagem (dividindo aproximadamente no meio)
  // Essa função será usada apenas em telas maiores que mobile.
  const formatWelcomeText = (text: string) => {
    if (!text) return "";
    const mid = Math.floor(text.length / 2);
    let breakIndex = text.indexOf(" ", mid);
    if (breakIndex === -1) breakIndex = mid;
    return (
      <>
        {text.slice(0, breakIndex)}
        <br />
        {text.slice(breakIndex + 1)}
      </>
    );
  };

  // Define as classes de animação com base no estado atual
  const animationClasses =
    animationState === "visible" || animationState === "entering"
      ? "translate-x-0 opacity-100"
      : "-translate-x-3/4 opacity-0";

  return (
    <div
      id="welcome"
      className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 pb-12"
      ref={welcomeRef}
    >
      {/* Número fixo "2122" */}
      <div className="flex-shrink-0">
        <p className="extra-large-title text-stone-200">2122</p>
      </div>
      {/* Container fixo para a mensagem que mantém o posicionamento */}
      <div className="w-full md:max-w-[40%] overflow-hidden text-center md:text-left">
        <div
          className={`subtitle pt-2 uppercase text-violet-400 mb-5 transition-all duration-1000 ${animationClasses}`}
        >
          {isMobile ? welcomeText : formatWelcomeText(welcomeText)}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
