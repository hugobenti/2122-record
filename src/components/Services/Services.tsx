import React, { useState } from "react";
import servicesData from "../../content/services.json";
import { useAppContext } from "../../context/AppContext";

const Services = () => {
  const { servicesRef, animations } = useAppContext();
  const [contentExpanded, setContentExpanded] = useState<boolean[]>(
    servicesData.map(() => false)
  );

  return (
    <div id="services" className={`bg-zinc-800 py-6 sm:px-24 px-8 `} ref={servicesRef}>
      <p
        className={`large-text text-stone-200 pb-8 transition-all duration-1000 ${
          animations.services
            ? `translate-x-0 opacity-100`
            : `-translate-x-full opacity-0`
        }`}
      >
        Serviços
      </p>
      {servicesData.map((mapValue, index) => {
        return (
          <div key={`service_${mapValue.title}`}>
            <p
              className={`large-title text-stone-200 pb-4 transition-all duration-1000 delay-150 ${
                animations.services
                  ? `translate-x-0 opacity-100`
                  : `-translate-x-full opacity-0`
              }`}
            >
              {mapValue.title}
            </p>
            <p
              className={`medium-text text-stone-200 pb-2 w-full transition-all duration-1000 delay-300 ${
                animations.services
                  ? `translate-x-0 opacity-100`
                  : `-translate-x-full opacity-0`
              }`}
            >
              {mapValue.text}
            </p>
            <div
              className={`duration-1000 delay-[1500ms] ${
                animations.services ? `opacity-100` : `opacity-0`
              }`}
            >
              <a
                className={`ml-auto pl-4  hover:text-violet-500 cursor-pointer medium-text-bold ${
                  !contentExpanded[index]
                    ? "text-violet-300"
                    : " text-violet-500"
                } `}
                onClick={() => {
                  setContentExpanded((prev) => {
                    const newContentExpanded = [...prev]; // Faz uma cópia do array anterior
                    newContentExpanded[index] = !prev[index]; // Atualiza o valor no índice desejado
                    return newContentExpanded; // Retorna o novo array atualizado
                  });
                }}
              >
                Saiba mais
              </a>
            </div>
            <div
              className={`medium-text pb-2 w-full overflow-hidden transition-all duration-1000 pt-2 px-4 ${
                contentExpanded[index]
                  ? "max-h-[200vh] text-stone-200"
                  : "max-h-[0px] text-transparent"
              }`}
            >
              {mapValue.fullContent.split("<br/>").map((mapValue, index) => {
                return (
                  <p key={`service_fullContent_${index}_${mapValue.slice(5)}`} className="medium-text pb-1">
                    {mapValue}
                    <br />
                  </p>
                );
              })}
            </div>
            <div className="w-full h-8" />
          </div>
        );
      })}
    </div>
  );
};

export default Services;
