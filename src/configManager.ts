import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'stonly-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const StonlyReactNative = NativeModules.StonlyReactNative
  ? NativeModules.StonlyReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const ConfigManager = {
  setDebugEnabled(debugEnabled: boolean) {
    StonlyReactNative.setDebugEnabled(debugEnabled);
  },
  setMonitoringEnabled(monitoringEnabled: boolean) {
    StonlyReactNative.setMonitoringEnabled(monitoringEnabled);
  },
  setSegmentAnonymousId(segmentAnonymousId: string) {
    StonlyReactNative.setSegmentAnonymousId(segmentAnonymousId);
  },
  setWidgetLanguage(languageCode: string) {
    StonlyReactNative.setWidgetLanguage(languageCode);
  },
  setWidgetId(widgetId: string) {
    StonlyReactNative.setWidgetId(widgetId);
  },
  setAuthorizedDomains(domains: string[]) {
    StonlyReactNative.setAuthorizedDomains(domains);
  },
  async getWidgetId(): Promise<string> {
    if (Platform.OS === 'ios') {
      // iOS uses synchronous method
      return StonlyReactNative.getWidgetId();
    } else {
      // Android uses Promise-based method
      return await StonlyReactNative.getWidgetId();
    }
  },
};
