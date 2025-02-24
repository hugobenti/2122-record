// UseHeader.ts
import { useRef, useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

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

  // Refs para os links do header
  const headerRefs: React.RefObject<HTMLAnchorElement>[] = [
    useRef<HTMLAnchorElement>(null),
    useRef<HTMLAnchorElement>(null),
    useRef<HTMLAnchorElement>(null),
    useRef<HTMLAnchorElement>(null),
    useRef<HTMLAnchorElement>(null),
  ];

  const headerOptions = ["Home", "Sobre", "Serviços", "Catalogo", "Portfolio"];

  // Obtém as refs das seções do contexto
  const { welcomeRef, aboutRef, servicesRef, catalogRef, portfolioRef } = useAppContext();

  useEffect(() => {
    // Executa somente na versão desktop (por exemplo, breakpoint sm: 640px)
    if (window.innerWidth < 640) return;

    const handleScroll = () => {
      // Mapeia as opções do header para as refs das seções
      const sections = [
        { index: 0, ref: welcomeRef },
        { index: 1, ref: aboutRef },
        { index: 2, ref: servicesRef },
        { index: 3, ref: catalogRef },
        { index: 4, ref: portfolioRef },
      ];

      let closestIndex = activeHeaderIndex;
      let minDistance = Infinity;

      sections.forEach(section => {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          // Calcula a distância entre o topo da seção e o topo do header (96px)
          const distance = Math.abs(rect.top - 96);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = section.index;
          }
        }
      });

      // Atualiza o índice ativo caso ele tenha mudado
      if (closestIndex !== activeHeaderIndex) {
        setActiveHeaderIndex(closestIndex);
        // Atualiza a posição do seletor com base na posição do link correspondente
        if (headerRefs[closestIndex].current) {
          const aux = headerRefs[closestIndex].current?.getBoundingClientRect();
          if(aux)
          setSelectorPosition(aux.x);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Chamada inicial para definir o estado

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeHeaderIndex, headerRefs, welcomeRef, aboutRef, servicesRef, catalogRef, portfolioRef]);

  return {
    selectorPosition,
    headerRefs,
    setSelectorPosition,
    headerOptions,
    activeHeaderIndex,
  };
}

export default UseHeader;
