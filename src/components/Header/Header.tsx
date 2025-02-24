// Header.tsx
import React, { useState } from "react";
import UseHeader from "./useHeader";
import MenuIcon from "../../assets/svgIcon/MenuIcon";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { headerOptions, headerRefs, selectorPosition, activeHeaderIndex, setSelectorPosition } = UseHeader();
  const { handleScroll } = useAppContext();

  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(true);

  return (
    <header className="fixed top-0 left-0 w-full z-10">
      <div className="bg-stone-800 bg-opacity-90 shadow-lg relative">
        {/* Barra superior fixa */}
        <div className="sm:px-24 px-6 h-24 flex items-center justify-between">
          {/* Menu desktop */}
          <nav className="hidden sm:flex gap-6 z-10 relative">
            {headerOptions.map((value, index) => (
              <a
                ref={headerRefs[index]}
                key={`header-${value}`}
                // Aplica sublinhado se este for o link ativo
                className={`pt-3 cursor-pointer border-b-[3px] transition-all text-slate-300 hover:text-violet-400 font-semibold text-lg ${
                  activeHeaderIndex === index ? " border-violet-400 text-violet-400" : "border-transparent"
                }`}
                onMouseEnter={() => {
                  const currentRef = headerRefs[index].current;
                  if (currentRef) {
                    setSelectorPosition(currentRef.getBoundingClientRect().x);
                  }
                }}
                onClick={() => handleScroll(value)}
              >
                {value}
              </a>
            ))}
          </nav>
          {/* Botão mobile */}
          <button
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-stone-700 p-2"
            onClick={() => setMenuCollapsed(prev => !prev)}
          >
            <MenuIcon stroke="#FFFFFF" />
          </button>
          {/* Logo ou título */}
          <p className="header-title text-stone-50">2122</p>
        </div>

        {/* Menu mobile expansível */}
        <div
          className={`sm:hidden absolute left-0 w-full bg-stone-800 shadow-lg overflow-hidden transition-all duration-500 ${
            menuCollapsed ? "max-h-0" : "max-h-[50vh]"
          }`}
          style={{ top: "6rem" }}
        >
          {headerOptions.map((value, index) => (
            <a
              key={`mobile-header-${value}`}
              className="block py-3 px-6 cursor-pointer text-slate-300 hover:text-slate-200 font-semibold text-lg"
              onClick={() => {
                handleScroll(value);
                setMenuCollapsed(true);
              }}
            >
              {value}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
