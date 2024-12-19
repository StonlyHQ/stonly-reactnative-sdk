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
export const TrackerManager = {
  identify(customerId, properties = {}) {
    StonlyReactNative.identify(customerId, properties);
  },
  track(eventName) {
    StonlyReactNative.track(eventName);
  }
};
//# sourceMappingURL=trackerManager.js.map