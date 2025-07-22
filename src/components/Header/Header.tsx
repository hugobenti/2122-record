// Header.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UseHeader from "./useHeader";
import MenuIcon from "./MenuIcon";

const Header = () => {
  const { headerOptions, headerRefs, activeHeaderIndex, setSelectorPosition } =
    UseHeader();
  const location = useLocation();

  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(true);

  // Mapeia as opções do header para as rotas
  const headerRoutes = ["/", "/sobre", "/servicos", "/catalogo", "/portfolio"];

  // Função para lidar com o clique no link "Home"
  const handleHomeClick = (e: React.MouseEvent) => {
    // Se estamos na HomePage, faz scroll para o topo
    if (location.pathname === "/" || location.pathname === "/sobre") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // Se não estamos na HomePage, navega normalmente
  };

  // Função para lidar com o clique no link "Sobre"
  const handleSobreClick = (e: React.MouseEvent) => {
    // Se estamos na HomePage (rota "/" ou "/sobre"), faz scroll para a seção About
    if (location.pathname === "/" || location.pathname === "/sobre") {
      e.preventDefault();
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const headerHeight = 96; // Altura do header
        const targetPosition = aboutSection.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
    // Se não estamos na HomePage, navega normalmente
  };

  return (
    <header className="fixed top-0 left-0 w-full z-10">
      <div className="bg-stone-800 bg-opacity-90 shadow-lg relative">
        {/* Barra superior fixa */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
          {/* Menu desktop */}
          <nav className="hidden sm:flex gap-4 sm:gap-6 lg:gap-8 z-10 relative">
            {headerOptions.map((value, index) => (
              <Link
                to={headerRoutes[index]}
                key={`header-${value}`}
                ref={headerRefs[index]}
                // Aplica sublinhado se este for o link ativo
                className={`pt-3 cursor-pointer border-b-[3px] transition-all text-slate-300 hover:text-violet-400 font-semibold text-base sm:text-lg ${
                  activeHeaderIndex === index
                    ? " border-violet-400 text-violet-400"
                    : "border-transparent"
                }`}
                onMouseEnter={() => {
                  const currentRef = headerRefs[index].current;
                  if (currentRef) {
                    setSelectorPosition(currentRef.getBoundingClientRect().x);
                  }
                }}
                onClick={
                  value === "Home" 
                    ? handleHomeClick 
                    : value === "Sobre" 
                    ? handleSobreClick 
                    : undefined
                }
              >
                {value}
              </Link>
            ))}
          </nav>
          {/* Botão mobile */}
          <button
            name="hamburger-menu-btn"
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-stone-700 p-2"
            onClick={() => setMenuCollapsed((prev) => !prev)}
          >
            <MenuIcon stroke="#FFFFFF" />
          </button>
          {/* Logo ou título */}
          <Link to="/" className="header-title text-stone-50 text-xl sm:text-2xl lg:text-3xl">
            2122
          </Link>
        </div>

        {/* Menu mobile expansível */}
        <div
          className={`sm:hidden absolute left-0 w-full bg-stone-800 shadow-lg overflow-hidden transition-all duration-500 ${
            menuCollapsed ? "max-h-0" : "max-h-[50vh]"
          }`}
          style={{ top: "4rem" }}
        >
          {headerOptions.map((value, index) => (
            <Link
              to={headerRoutes[index]}
              key={`mobile-header-${value}`}
              className="block py-3 px-6 cursor-pointer text-slate-300 hover:text-slate-200 font-semibold text-lg"
              onClick={(e) => {
                setMenuCollapsed(true);
                if (value === "Home") {
                  handleHomeClick(e);
                } else if (value === "Sobre") {
                  handleSobreClick(e);
                }
              }}
            >
              {value}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
