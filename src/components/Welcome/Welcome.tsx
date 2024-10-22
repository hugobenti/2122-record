import React, { useMemo } from "react";
import { useAppContext } from "../../context/AppContext";
import welcomeArray from "../../content/welcome.json";

const Welcome = () => {
  const { welcomeRef, animations } = useAppContext();
  const welcomeText = useMemo(() => {
    const index = Math.floor(Math.random() * welcomeArray.length);
    return welcomeArray[index];
  }, [animations.welcome]);
  return (
    <div
      id="welcome"
      className="flex justify-center sm:items-end items-center gap-4 pt-16 pb-12 sm:flex-row flex-col"
      ref={welcomeRef}
    >
      <p
        className={`extra-large-title transition-all ${
          animations.welcome === true ? `text-stone-200` : `text-stone-50`
        }`}
      >
        2122
      </p>
      <div className="max-w-[40%] overflow-hidden flex items-start">
        <div
          className={`sm:large-text large-title uppercase text-stone-300 mb-1 transition-all duration-1000 ${
            animations.welcome === true
              ? `translate-x-0 opacity-100`
              : `-translate-x-3/4 opacity-0`
          }`}
        >
          {welcomeText}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
