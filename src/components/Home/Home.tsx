import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import AnimatePolvo from "./components/AnimatePolvo";

const Home = () => {
  const { homeRef, animations } = useAppContext();

  return (
    <div className={`bg-stone-900 px-24 w-full`}>
      <div className="flex w-full justify-between gap-8 items-center">
        <div className="h-full flex flex-col gap-8 items-center justify-center">
          <div className="w-full pb-6" ref={homeRef} id="home">
            <p
              className={`text-stone-400 large-title transition-all delay-500 duration-1000 ease-in overflow-hidden home-text ${
                animations.home
                  ? "opacity-100 max-w-[720px]"
                  : " opacity-0 max-w-0"
              }`}
            >
              Somos uma equipe dedicada a oferecer soluções inovadoras e
              personalizadas para o seu negócio.
            </p>
          </div>
          <div className="rounded-lg text-center text-stone-400 p-6 bg-stone-800">
            Fale com a gente
          </div>
        </div>
        <AnimatePolvo />
      </div>
    </div>
  );
};

export default Home;
