import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type AnimationKeys = "welcome" | "about" | "featuredArtist" | "home";
// Interface para os dados do contexto
export interface AppContextData {
  animations: IAnimations;
  welcomeRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  featuredArtistRef: React.RefObject<HTMLDivElement>;
  homeRef: React.RefObject<HTMLDivElement>;
  handleShowAnimation: (id: AnimationKeys) => void;
}

export interface IAnimations {
  welcome: boolean;
  about: boolean;
  featuredArtist: boolean;
  home: boolean;
}

type AppProviderProps = {
  children: ReactNode;
};

const AppContext = createContext<AppContextData | null>(null);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuredArtistRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const [animations, setAnimations] = useState<IAnimations>({
    welcome: false,
    about: false,
    featuredArtist: false,
    home: false,
  });

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
            const id = entry.target.id as AnimationKeys;
            setAnimations((prev) => ({ ...prev, [id]: false }));
          }
        });
      },
      { threshold: 0 }
    );

    if (welcomeRef.current) observer.observe(welcomeRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (featuredArtistRef.current) observer.observe(featuredArtistRef.current);
    if (homeRef.current) observer.observe(homeRef.current);

    return () => {
      if (welcomeRef.current) observer.unobserve(welcomeRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (featuredArtistRef.current) observer.unobserve(featuredArtistRef.current);
      if (homeRef.current) observer.unobserve(homeRef.current);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        animations,
        welcomeRef,
        aboutRef,
        featuredArtistRef,
        homeRef,
        handleShowAnimation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextData => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
};
