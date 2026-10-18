jest.mock('react-native', () => ({
  NativeModules: {
    StonlyReactNative: {
      onScreenChanged: jest.fn(),
    },
  },
  Platform: { OS: 'ios', select: jest.fn() },
}));

import { NativeModules } from 'react-native';
import { NavigationManager } from '../navigationManager';

const mockOnScreenChanged = NativeModules.StonlyReactNative
  .onScreenChanged as jest.Mock;

const makeNavigationRef = (name?: string) => {
  const listeners: Record<string, (event: unknown) => void> = {};
  return {
    listeners,
    ref: {
      addListener: (event: string, cb: (e: unknown) => void) => {
        listeners[event] = cb;
      },
      getCurrentRoute: () => (name === undefined ? undefined : { name }),
    },
  };
};

describe('NavigationManager.setupNavigation', () => {
  beforeEach(() => {
    mockOnScreenChanged.mockClear();
  });

  it('reports the route name without a leading slash', () => {
    const { ref, listeners } = makeNavigationRef('DemoShowroom');
    NavigationManager.setupNavigation(ref);
    listeners.state?.({});
    expect(mockOnScreenChanged).toHaveBeenCalledWith('DemoShowroom');
  });

  it('removes only the leading slash from a slash-prefixed route name', () => {
    const { ref, listeners } = makeNavigationRef('/Home/Details');
    NavigationManager.setupNavigation(ref);
    listeners.state?.({});
    expect(mockOnScreenChanged).toHaveBeenCalledWith('Home/Details');
  });

  it('strips a single slash only, so "//Home" becomes "/Home"', () => {
    const { ref, listeners } = makeNavigationRef('//Home');
    NavigationManager.setupNavigation(ref);
    listeners.state?.({});
    expect(mockOnScreenChanged).toHaveBeenCalledWith('/Home');
  });

  it('ignores state changes without a current route', () => {
    const { ref, listeners } = makeNavigationRef(undefined);
    NavigationManager.setupNavigation(ref);
    listeners.state?.({});
    expect(mockOnScreenChanged).not.toHaveBeenCalled();
  });

  it('ignores a route whose name is empty', () => {
    const { ref, listeners } = makeNavigationRef('');
    NavigationManager.setupNavigation(ref);
    listeners.state?.({});
    expect(mockOnScreenChanged).not.toHaveBeenCalled();
  });
});

describe('NavigationManager.setupNativeNavigation', () => {
  beforeEach(() => {
    mockOnScreenChanged.mockClear();
  });

  it('passes componentName unchanged', () => {
    let cb: (event: unknown) => void = () => {};
    const navigation = {
      events: () => ({
        registerComponentDidAppearListener: (fn: (e: unknown) => void) => {
          cb = fn;
        },
      }),
    };
    NavigationManager.setupNativeNavigation(navigation);
    cb({ componentName: 'Screen' });
    expect(mockOnScreenChanged).toHaveBeenCalledWith('Screen');
  });
});
