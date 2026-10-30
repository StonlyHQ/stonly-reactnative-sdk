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
    // react-native-navigation
    navigation.events().registerComponentDidAppearListener(event => {
      StonlyReactNative.onScreenChanged(event.componentName);
    });
  },
  /**
   * Reports each react-navigation screen change to the native SDK as the
   * route name without a leading slash (e.g. `DemoShowroom`), matching what
   * iOS strips natively and what CMS page rules contain.
   */
  setupNavigation(navigationRef) {
    navigationRef.addListener('state', _ => {
      var _navigationRef$getCur;
      const name = (_navigationRef$getCur = navigationRef.getCurrentRoute()) === null || _navigationRef$getCur === void 0 ? void 0 : _navigationRef$getCur.name;
      if (!name) {
        return;
      }
      StonlyReactNative.onScreenChanged(name.replace(/^\//, ''));
    });
  }
};
//# sourceMappingURL=navigationManager.js.map