import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'stonly-react-native' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const StonlyReactNative = NativeModules.StonlyReactNative ? NativeModules.StonlyReactNative : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
export const ConfigManager = {
  setDebugEnabled(debugEnabled) {
    StonlyReactNative.setDebugEnabled(debugEnabled);
  },
  setMonitoringEnabled(monitoringEnabled) {
    StonlyReactNative.setMonitoringEnabled(monitoringEnabled);
  },
  setSegmentAnonymousId(segmentAnonymousId) {
    StonlyReactNative.setSegmentAnonymousId(segmentAnonymousId);
  },
  setWidgetLanguage(languageCode) {
    StonlyReactNative.setWidgetLanguage(languageCode);
  },
  setWidgetId(widgetId) {
    StonlyReactNative.setWidgetId(widgetId);
  },
  setAuthorizedDomains(domains) {
    StonlyReactNative.setAuthorizedDomains(domains);
  },
  async getWidgetId() {
    if (Platform.OS === 'ios') {
      // iOS uses synchronous method
      return StonlyReactNative.getWidgetId();
    } else {
      // Android uses Promise-based method
      return await StonlyReactNative.getWidgetId();
    }
  }
};
//# sourceMappingURL=configManager.js.map