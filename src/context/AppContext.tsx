import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Interface para os dados do contexto
export interface AppContextData {
  animations: IAnimations;
  welcomeRef: React.RefObject<HTMLDivElement>;
  servicesRef: React.RefObject<HTMLDivElement>;
  catalogRef: React.RefObject<HTMLDivElement>;
}

export interface IAnimations {
  welcome: boolean,
  services: boolean,
  catalog:boolean,
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
  const catalogRef = useRef<HTMLDivElement>(null);
  const [animations, setAnimations] = useState<IAnimations>({
    welcome: false,
    services: false,
    catalog:false,
  });


  type AnimationKeys = "welcome" | "services" | "catalog";

  const handleShowAnimation = (id: AnimationKeys) => {

    setAnimations((prev) => ({ ...prev, [id]: true }));
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
    };
  }, []); // Apenas a primeira renderização

  return (
    <AppContext.Provider
      value={{
        animations,
        welcomeRef,
        servicesRef,
        catalogRef
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
