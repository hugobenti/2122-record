import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

jest.mock('../../context/AppContext', () => ({ useAppContext: () => ({ welcomeRef: { current: null } }) }));

beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

test('renders without matchMedia in browsers that do not provide it', () => {
  const original = window.matchMedia;
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: undefined });
  try {
    render(<Welcome />);
    expect(screen.getByText('2122')).toBeInTheDocument();
  } finally {
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: original });
  }
});

test('subscribes to legacy media-query changes and removes the listener on unmount', () => {
  const original = window.matchMedia;
  let listener: ((event: MediaQueryListEvent) => void) | undefined;
  const removeListener = jest.fn();
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: jest.fn().mockReturnValue({ matches: false, addListener: (callback: (event: MediaQueryListEvent) => void) => { listener = callback; }, removeListener }) });
  try {
    const { unmount } = render(<Welcome />);
    expect(listener).toEqual(expect.any(Function));
    unmount();
    expect(removeListener).toHaveBeenCalledWith(listener);
  } finally {
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: original });
  }
});
