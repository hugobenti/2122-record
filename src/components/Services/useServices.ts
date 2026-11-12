import { createRef, useEffect, useRef, useState } from 'react';
import { services } from './Services.data';

export const useServices = () => {
  const [expanded, setExpanded] = useState<boolean[]>(services.map(() => false));
  const [scrollTarget, setScrollTarget] = useState<number | null>(null);
  const sectionRefs = useRef(services.map(() => createRef<HTMLDivElement>()));

  useEffect(() => {
    if (scrollTarget === null) return;
    const timeout = window.setTimeout(() => {
      const section = sectionRefs.current[scrollTarget].current;
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top,
        behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }, 100);
    return () => window.clearTimeout(timeout);
  }, [scrollTarget]);

  const toggle = (index: number) => {
    const opening = !expanded[index];
    setExpanded((previous) => previous.map((value, position) => position === index ? opening : value));
    setScrollTarget(opening ? index : null);
  };

  return { expanded, sectionRefs: sectionRefs.current, toggle };
};
