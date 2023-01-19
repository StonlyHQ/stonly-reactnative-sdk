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
export const NavigationManager = {
  setupNativeNavigation(navigation) {
    navigation.events().registerComponentDidAppearListener(event => {
      console.log('stonly event', event); //  componentName: 'Home',componentId: 'Component1',
      StonlyReactNative.onScreenChanged(event.componentName, -1);
    });
  },
  setupNavigation(navigationRef) {
    navigationRef.addListener('state', e => {
      var _e$data$state, _e$data$state$routes;
      let routeName = '';
      let index = null;
      (_e$data$state = e.data.state) === null || _e$data$state === void 0 ? void 0 : (_e$data$state$routes = _e$data$state.routes) === null || _e$data$state$routes === void 0 ? void 0 : _e$data$state$routes.forEach(element => {
        var _element$state, _element$state2;
        index = (_element$state = element.state) === null || _element$state === void 0 ? void 0 : _element$state.index;
        if (typeof element === 'string') {
          routeName += '/' + element;
        }
        // type = element.data.state?.type
        if (element.state && (_element$state2 = element.state) !== null && _element$state2 !== void 0 && _element$state2.routeNames && index) {
          var _element$state3;
          routeName = '/' + ((_element$state3 = element.state) === null || _element$state3 === void 0 ? void 0 : _element$state3.routeNames[index]);
        }
        console.log('stonly event index: ', index);
      });
      console.log('stonly event routeName: ', routeName);
      console.log('stonly event index: ', index);
      if (index == null) {
        index = -1;
      }
      StonlyReactNative.onScreenChanged(routeName, index);
    });
  }
};
//# sourceMappingURL=navigationManager.js.map