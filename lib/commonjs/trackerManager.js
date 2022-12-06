"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackerManager = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'stonly-react-native' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const StonlyReactNative = _reactNative.NativeModules.StonlyReactNative ? _reactNative.NativeModules.StonlyReactNative : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const TrackerManager = {
  identify(customerId) {
    let properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    StonlyReactNative.identify(customerId, properties);
  },
  track(eventName) {
    StonlyReactNative.track(eventName);
  }
};
exports.TrackerManager = TrackerManager;
//# sourceMappingURL=trackerManager.js.map