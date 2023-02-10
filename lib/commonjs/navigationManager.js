"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationManager = void 0;
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
const NavigationManager = {
  setupNativeNavigation(navigation) {
    // react-native-navigation
    navigation.events().registerComponentDidAppearListener(event => {
      StonlyReactNative.onScreenChanged(event.componentName, -1);
    });
  },
  setupNavigation(navigationRef) {
    // react-navigation
    navigationRef.addListener('state', e => {
      var _e$data$state, _e$data$state$routes;
      let routeName = "/" + navigationRef.current.getCurrentRoute().name;
      let index = -1;
      (_e$data$state = e.data.state) === null || _e$data$state === void 0 ? void 0 : (_e$data$state$routes = _e$data$state.routes) === null || _e$data$state$routes === void 0 ? void 0 : _e$data$state$routes.forEach(element => {
        var _element$state;
        index = (_element$state = element.state) === null || _element$state === void 0 ? void 0 : _element$state.index;
      });
      StonlyReactNative.onScreenChanged(routeName, index);
    });
  }
};
exports.NavigationManager = NavigationManager;
//# sourceMappingURL=navigationManager.js.map