import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { NAV_ITEMS } from './Header.data';
import type { INavLink, IUseHeader } from './Header.type';

function useHeader(): IUseHeader {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  const items: INavLink[] = NAV_ITEMS.map((item) => ({
    ...item,
    isCurrent: pathname === item.to,
  }));

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    const desktop = window.matchMedia?.('(min-width: 640px)');
    if (!desktop) return;
    if (desktop.matches) {
      close();
      return;
    }
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    if (desktop.addEventListener) {
      desktop.addEventListener('change', onChange);
      return () => desktop.removeEventListener('change', onChange);
    }
    desktop.addListener(onChange);
    return () => desktop.removeListener(onChange);
  }, [isOpen, close]);

  const onHomeClick = (event: MouseEvent) => {
    close();
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  };

  return { isOpen, toggle, close, toggleRef, items, onHomeClick };
}

export default useHeader;
