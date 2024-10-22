import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import AnimatePolvo from "./components/AnimatePolvo";
import YoutubeEmbed from "../YoutubeEmbed";

const Home = () => {
  const { homeRef, animations } = useAppContext();

  return (
    <div className={`bg-stone-900 px-24 w-full `} ref={homeRef}>
      <div className="flex w-full justify-between gap-8 items-center">
        <div className="h-full flex flex-col gap-8 items-center justify-center">
          <div className="w-full pb-6"  id="home">
   
            <div className="flex h-full">
              <YoutubeEmbed embedId="IwQ2eFQwdoE" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col transition-all">
          <div className="scale-[1.5] hover:scale-[1.7] transition-all duration-1000">
            <AnimatePolvo />
          </div>
          <button className="z-10 group rounded-lg text-center text-stone-100 px-6 py-4 bg-stone-800 opacity-80 hover:opacity-100 transition-all hover:bg-stone-600 hover:text-stone-200 cursor-pointer">
            Saiba mais
          </button>

          <p
              className={`pt-6 text-stone-400 text-center z-10 small-text transition-all delay-500 duration-1000 ease-in overflow-hidden home-text ${
                animations.home
                  ? "opacity-100 max-w-[720px]"
                  : " opacity-0 max-w-0"
              }`}
            >
              Oferecemos soluções inovadoras e
              personalizadas para o seu negócio.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
