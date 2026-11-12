import { useAppContext } from '../../context/AppContext';

export const useAbout = () => {
  const { aboutRef } = useAppContext();
  return { aboutRef };
};
