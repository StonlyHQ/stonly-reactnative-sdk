jest.mock('react-native', () => ({
  NativeModules: {
    StonlyReactNative: {
      setWidgetId: jest.fn(),
      setSentryEnabled: jest.fn(),
    },
  },
  Platform: { OS: 'ios', select: jest.fn() },
}));

import { NativeModules } from 'react-native';
import { ConfigManager } from '../configManager';

const mockSetWidgetId = NativeModules.StonlyReactNative
  .setWidgetId as jest.Mock;
const mockSetSentryEnabled = NativeModules.StonlyReactNative
  .setSentryEnabled as jest.Mock;

describe('ConfigManager.setWidgetId', () => {
  beforeEach(() => {
    mockSetWidgetId.mockClear();
  });

  it('defaults datacenter to eu', () => {
    ConfigManager.setWidgetId('widget-123');
    expect(mockSetWidgetId).toHaveBeenCalledWith('widget-123', 'eu');
  });

  it('passes us datacenter to the native module', () => {
    ConfigManager.setWidgetId('widget-123', 'us');
    expect(mockSetWidgetId).toHaveBeenCalledWith('widget-123', 'us');
  });

  it('passes eu datacenter explicitly', () => {
    ConfigManager.setWidgetId('widget-123', 'eu');
    expect(mockSetWidgetId).toHaveBeenCalledWith('widget-123', 'eu');
  });
});

describe('ConfigManager.setSentryEnabled', () => {
  beforeEach(() => {
    mockSetSentryEnabled.mockClear();
  });

  it('passes false to the native module (opt-out)', () => {
    ConfigManager.setSentryEnabled(false);
    expect(mockSetSentryEnabled).toHaveBeenCalledWith(false);
  });

  it('passes true to the native module (re-enable)', () => {
    ConfigManager.setSentryEnabled(true);
    expect(mockSetSentryEnabled).toHaveBeenCalledWith(true);
  });
});
