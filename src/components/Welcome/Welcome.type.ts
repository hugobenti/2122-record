export type TWelcomePhase = 'visible' | 'exiting' | 'entering';

export interface IWelcomeView {
  lines: [string, string];
  isMobile: boolean;
  phase: TWelcomePhase;
  welcomeRef: React.RefObject<HTMLDivElement>;
}
