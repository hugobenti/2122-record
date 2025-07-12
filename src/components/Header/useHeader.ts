// UseHeader.ts
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface IUseHeader {
  selectorPosition: number;
  headerRefs: React.RefObject<HTMLAnchorElement>[];
  setSelectorPosition: React.Dispatch<React.SetStateAction<number>>;
  headerOptions: string[];
  activeHeaderIndex: number;
}

function UseHeader(initialValue: number = 0): IUseHeader {
  const [selectorPosition, setSelectorPosition] = useState<number>(200);
  const [activeHeaderIndex, setActiveHeaderIndex] = useState<number>(0);
  const location = useLocation();

  // Refs para os links do header
  const headerRef0 = useRef<HTMLAnchorElement>(null);
  const headerRef1 = useRef<HTMLAnchorElement>(null);
  const headerRef2 = useRef<HTMLAnchorElement>(null);
  const headerRef3 = useRef<HTMLAnchorElement>(null);
  const headerRef4 = useRef<HTMLAnchorElement>(null);

  const headerRefs: React.RefObject<HTMLAnchorElement>[] = useMemo(() => [
    headerRef0,
    headerRef1,
    headerRef2,
    headerRef3,
    headerRef4,
  ], [headerRef0, headerRef1, headerRef2, headerRef3, headerRef4]);

  const headerOptions = ["Home", "Sobre", "Serviços", "Catalogo", "Portfolio"];

  // Mapeia as rotas para os índices
  const routeToIndex: { [key: string]: number } = useMemo(() => ({
    '/': 0,
    '/sobre': 1,
    '/servicos': 2,
    '/catalogo': 3,
    '/portfolio': 4,
  }), []);

  // Função para detectar qual seção está visível
  const detectActiveSection = useCallback(() => {
    if (location.pathname !== "/" && location.pathname !== "/sobre") {
      return; // Só funciona na HomePage
    }

    const scrollPosition = window.scrollY + 100; // Offset para considerar o header
    const aboutSection = document.getElementById("about");
    
    if (aboutSection) {
      const aboutTop = aboutSection.offsetTop;
      
      if (scrollPosition >= aboutTop) {
        // Se está na seção About, destaca "Sobre"
        setActiveHeaderIndex(1);
        if (headerRefs[1].current) {
          const rect = headerRefs[1].current.getBoundingClientRect();
          setSelectorPosition(rect.x);
        }
      } else {
        // Se está acima da seção About, destaca "Home"
        setActiveHeaderIndex(0);
        if (headerRefs[0].current) {
          const rect = headerRefs[0].current.getBoundingClientRect();
          setSelectorPosition(rect.x);
        }
      }
    }
  }, [location.pathname, headerRefs]);

  useEffect(() => {
    // Se estamos na HomePage, usa a detecção de scroll
    if (location.pathname === "/" || location.pathname === "/sobre") {
      detectActiveSection();
    } else {
      // Para outras páginas, usa a rota para determinar o índice ativo
      const currentIndex = routeToIndex[location.pathname] || 0;
      setActiveHeaderIndex(currentIndex);
      
      // Atualiza a posição do seletor
      if (headerRefs[currentIndex].current) {
        const rect = headerRefs[currentIndex].current?.getBoundingClientRect();
        if (rect) {
          setSelectorPosition(rect.x);
        }
      }
    }
  }, [location.pathname, routeToIndex, headerRefs, detectActiveSection]);

  // Adiciona listener de scroll para detectar seção ativa (só na HomePage)
  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/sobre") {
      return; // Só adiciona listener na HomePage
    }

    const handleScroll = () => {
      detectActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [detectActiveSection, location.pathname]);

  return {
    selectorPosition,
    headerRefs,
    setSelectorPosition,
    headerOptions,
    activeHeaderIndex,
  };
}

export default UseHeader;
