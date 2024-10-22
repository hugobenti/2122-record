import React, { useState } from "react";
import UseHeader from "./useHeader";
import MenuIcon from "../../assets/svgIcon/MenuIcon";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { headerOptions, headerRefs, selectorPosition, setSelectorPosition } =
    UseHeader();
    const { handleScroll } = useAppContext();

  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(true);
  return (
    <div className="fixed w-screen h-24 bg-stone-800 shadow-lg z-10 ">
      <div className="sm:px-24 px-6 w-auto h-full flex items-center justify-between shadow-md overflow-hidden">
        <div className="gap-6 z-10 sm:flex hidden">
          {headerOptions.map((value, index) => {
            return (
              <a
                ref={headerRefs[index]}
                key={`header-${value}`}
                className={`py-3 cursor-pointer text-slate-300 hover:text-slate-200 font-semibold text-lg`}
                onMouseEnter={(event) => {
                  if (headerRefs[index].current)
                    setSelectorPosition(
                      headerRefs[index].current!.getBoundingClientRect().x
                    );
                }}
                onClick={()=>{
                  handleScroll(value)
                }}
              >
                {value}
              </a>
            );
          })}
        </div>

        <button
          className="sm:hidden flex w-10 h-10 rounded-lg hover:bg-stone-700 p-2"
          onClick={() => {
            setMenuCollapsed((prev) => !prev);
          }}
        >
          <MenuIcon stroke="#FFFFFF" />
        </button>

        <p className="large-title text-stone-50">2122</p>
      </div>

      <div
        style={{
          transform: `translateX(${selectorPosition}px) rotate(210deg)`,
        }}
        className="sm:absolute hidden -top-8 left-0 w-12 h-40 bg-slate-700 opacity-20 transition-all"
      />
      <div
        className={`w-auto flex flex-col bg-stone-800 mt-[1px] shadow-lg ${
          menuCollapsed ? "max-h-0" : "max-h-[25vh]"
        } transition-all overflow-hidden`}
      >
        {headerOptions.map((value, index) => {
          return (
            <a
              className={`py-3 px-6 cursor-pointer text-slate-300 hover:text-slate-200 font-semibold text-lg`}
              onClick={()=>{
                handleScroll(value)
                setMenuCollapsed(true);
              }}
            >
              {value}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
