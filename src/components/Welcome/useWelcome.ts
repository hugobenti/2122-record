import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import welcomeArray from '../../content/welcome.json';
import { splitAtMiddleSpace } from './welcomeText';
import { IWelcomeView, TWelcomePhase } from './Welcome.type';

const exitDuration = 500;
const enterDuration = 500;
const cycleDuration = 6000;

export const useWelcome = (): IWelcomeView => {
  const { welcomeRef } = useAppContext();
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<TWelcomePhase>('visible');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isInView, setIsInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduceMotion(preference.matches);
    preference.addEventListener('change', handleChange);
    return () => preference.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setIsInView(entry.isIntersecting)),
      { threshold: 0.1 }
    );
    if (welcomeRef.current) observer.observe(welcomeRef.current);
    return () => observer.disconnect();
  }, [welcomeRef]);

  useEffect(() => {
    if (!isInView) return;
    const updatePhrase = () => setText(welcomeArray[Math.floor(Math.random() * welcomeArray.length)]);
    const timeouts: number[] = [];
    updatePhrase();
    setPhase('visible');
    const interval = window.setInterval(() => {
      if (reduceMotion) {
        updatePhrase();
        return;
      }
      setPhase('exiting');
      timeouts.push(window.setTimeout(() => {
        updatePhrase();
        setPhase('entering');
        timeouts.push(window.setTimeout(() => setPhase('visible'), enterDuration));
      }, exitDuration));
    }, cycleDuration);
    return () => {
      window.clearInterval(interval);
      timeouts.forEach(window.clearTimeout);
    };
  }, [isInView, reduceMotion]);

  return { lines: splitAtMiddleSpace(text), isMobile, phase, welcomeRef };
};
