import { cx } from '../../utils/cx';

export const header = {
  base: 'fixed top-0 left-0 w-full z-10',
  surface: 'bg-surface shadow-lg relative',
  bar: 'px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 h-16 sm:h-20 lg:h-24 flex items-center justify-between',
  desktop: 'hidden sm:flex gap-4 sm:gap-6 lg:gap-8 z-10 relative',
  desktopLink: 'pt-3 cursor-pointer border-b-[3px] transition-all hover:text-accent-strong font-semibold text-base sm:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-strong',
  desktopIdle: 'border-transparent text-ink-muted',
  desktopCurrent: 'border-accent-strong text-accent-strong',
  toggle: 'sm:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-surface-sunken p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-strong',
  title: 'header-title text-ink text-xl sm:text-2xl lg:text-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-strong',
  mobile: 'sm:hidden absolute left-0 top-16 w-full bg-surface shadow-lg motion-safe:animate-menu-fade',
  mobileLink: cx('block py-3 px-6 min-h-11 cursor-pointer hover:text-ink font-semibold text-lg', 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-strong'),
  mobileIdle: 'text-ink-muted',
  mobileCurrent: 'text-accent-strong',
};
