import React from "react";
import UseHeader from "./useHeader";

const Header = () => {
  const { headerOptions, headerRefs, selectorPosition, setSelectorPosition } =
    UseHeader();
  return (
    <div className="fixed w-full h-24 bg-stone-900 shadow-lg overflow-hidden z-10">
      <div className="w-full h-full px-6 flex items-center justify-around shadow-md overflow-hidden">
        <p className="large-title text-stone-50">2122</p>

        <div className="flex gap-6 z-10">
          {headerOptions.map((value, index) => {
            return (
              <a
                ref={headerRefs[index]}
                key={`header-${value}`}
                className={`py-3 cursor-pointer text-slate-300 hover:text-slate-200 font-semibold text-lg`}
                onMouseEnter={(event) => {
                    if (headerRefs[index].current)
                      setSelectorPosition(headerRefs[index].current!.getBoundingClientRect().x);
                  }}
              >
                {value}
              </a>
            );
          })}
        </div>
      </div>

      <div
        style={{
          transform: `translateX(${selectorPosition}px) rotate(210deg)`,
        }}
        className="absolute -top-8 left-0 w-12 h-40 bg-stone-700 opacity-20 transition-all"
      />
    </div>
  );
};

export default Header;
