import React from 'react';
import { cx } from '../../utils/cx';
import { useWelcome } from './useWelcome';
import { welcome } from './Welcome.style';

const Welcome = () => {
  const { lines, isMobile, phase, welcomeRef } = useWelcome();

  return (
    <div id="welcome" className={welcome.base} ref={welcomeRef}>
      <div className={welcome.numberContainer}>
        <p className={welcome.title}>2122</p>
      </div>
      <div className={welcome.messageContainer}>
        <div className={cx(welcome.subtitle.base, welcome.subtitle.phase[phase])}>
          {isMobile ? <>{lines[0]} {lines[1]}</> : <>{lines[0]}<br />{lines[1]}</>}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
