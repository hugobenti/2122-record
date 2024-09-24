import { useRef, useState } from 'react';

// Definindo a interface para o retorno do hook
interface IUseHeader {
    selectorPosition: number;
    headerRefs: React.RefObject<HTMLAnchorElement>[]
    setSelectorPosition: React.Dispatch<React.SetStateAction<number>>
    headerOptions:string[]
}

function UseHeader(initialValue: number = 0): IUseHeader {
    const [selectorPosition, setSelectorPosition] = useState<number>(200);
    // const headerRefs: React.RefObject<HTMLAnchorElement>[] = Array.from({ length: 4 }, () => useRef<HTMLAnchorElement>(null));
    const headerRefs: React.RefObject<HTMLAnchorElement>[] = [
        useRef<HTMLAnchorElement>(null),
        useRef<HTMLAnchorElement>(null),
        useRef<HTMLAnchorElement>(null),
        useRef<HTMLAnchorElement>(null),
      ];
    
    const headerOptions = ["Sobre","Artistas","Lançamentos","Contato"];
  return {
    selectorPosition,
    headerRefs,
    setSelectorPosition,headerOptions
  };
}

export default UseHeader;
