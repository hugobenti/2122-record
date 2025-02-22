import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type AnimationKeys = "welcome" | "services" | "catalog" | "home" | "portfolio";
// Interface para os dados do contexto
export interface AppContextData {
  animations: IAnimations;
  welcomeRef: React.RefObject<HTMLDivElement>;
  servicesRef: React.RefObject<HTMLDivElement>;
  catalogRef: React.RefObject<HTMLDivElement>;
  portfolioRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  homeRef: React.RefObject<HTMLDivElement>;
  handleScroll: (step: string) => void;
}

export interface IAnimations {
  welcome: boolean;
  services: boolean;
  catalog: boolean;
  portfolio: boolean;
  home: boolean;
}

// Tipos para as props do provider
type AppProviderProps = {
  children: ReactNode; // Aceita qualquer coisa que React pode renderizar
};

// Criando o contexto com valor inicial nulo
const AppContext = createContext<AppContextData | null>(null);

// Provider do contexto
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const [animations, setAnimations] = useState<IAnimations>({
    welcome: false,
    services: false,
    catalog: false,
    home: false,
    portfolio: false,
  });

  const handleShowAnimation = (id: AnimationKeys) => {
    setAnimations((prev) => ({ ...prev, [id]: true }));
  };

  const fixHeaderScrollPosition = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      const yOffset = -96; // Compensação de 90px
      const y = ref.current?.getBoundingClientRect().top || 0;
      window.scrollTo({
        top: window.pageYOffset + y + yOffset,
        behavior: "smooth",
      });
    }, 100); // Delay para garantir que o scroll original termine
  };

  const handleScroll = (step: string) => {
    switch (step.toLocaleLowerCase()) {
      case "home":
        welcomeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      case "sobre":
        aboutRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        fixHeaderScrollPosition(aboutRef);
        return;
      case "catalogo":
        catalogRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        fixHeaderScrollPosition(catalogRef);
        return;
      case "serviços":
        servicesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        fixHeaderScrollPosition(servicesRef);
        return;
      case "portfolio":
        portfolioRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        fixHeaderScrollPosition(portfolioRef);
        return;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleShowAnimation(entry.target.id as AnimationKeys);
          } else {
            // Se o elemento sair da viewport, redefina a animação
            const id = entry.target.id as AnimationKeys;
            setAnimations((prev) => ({ ...prev, [id]: false }));
          }
        });
      },
      { threshold: 0 }
    ); // Ajuste o threshold conforme necessário

    if (welcomeRef.current) {
      observer.observe(welcomeRef.current);
    }

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    if (catalogRef.current) {
      observer.observe(catalogRef.current);
    }
    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }
    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    return () => {
      if (welcomeRef.current) {
        observer.unobserve(welcomeRef.current);
      }
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
      if (catalogRef.current) {
        observer.unobserve(catalogRef.current);
      }
      if (homeRef.current) {
        observer.unobserve(homeRef.current);
      }
      if (portfolioRef.current) {
        observer.unobserve(portfolioRef.current);
      }
    };
  }, []); // Apenas a primeira renderização

  return (
    <AppContext.Provider
      value={{
        animations,
        welcomeRef,
        servicesRef,
        portfolioRef,
        homeRef,
        catalogRef,
        handleScroll,
        aboutRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAppContext = (): AppContextData => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
