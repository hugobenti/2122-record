import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import AnimatePolvo from "../../assets/AnimatePolvo";
import YoutubeEmbed from "../YoutubeEmbed";

const Home = () => {
  const { homeRef, animations } = useAppContext();

  return (
    <div className={`bg-stone-900 sm:px-24 px-8 w-full pb-12`} ref={homeRef}>
      <div className="flex w-full items-center">
        <YoutubeEmbed embedId="IwQ2eFQwdoE" />
      </div>
    </div>
  );
};
 
export default Home;
