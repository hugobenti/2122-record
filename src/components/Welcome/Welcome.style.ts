export const welcome = {
  base: 'flex flex-col sm:flex-row items-center justify-center gap-8 pt-24 sm:gap-12 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24',
  numberContainer: 'flex-shrink-0',
  title: 'extra-large-title text-ink',
  messageContainer: 'w-full md:max-w-[45%] overflow-hidden text-center md:text-left',
  subtitle: {
    base: 'subtitle pt-2 captalize text-accent mb-5 motion-safe:transition-all motion-safe:duration-500',
    phase: {
      visible: 'translate-x-0 opacity-100',
      exiting: 'translate-x-full opacity-0',
      entering: '-translate-x-full opacity-0',
    },
  },
};
