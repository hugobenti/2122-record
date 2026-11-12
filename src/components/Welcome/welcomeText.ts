export const splitAtMiddleSpace = (text: string): [string, string] => {
  const breakIndex = text.indexOf(' ', Math.floor(text.length / 2));
  return breakIndex === -1
    ? [text, '']
    : [text.slice(0, breakIndex), text.slice(breakIndex + 1)];
};
