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

export const NavigationManager = {
   setupNativeNavigation(navigation: any) { // react-native-navigation
     navigation.events().registerComponentDidAppearListener((event : any) => {
       StonlyReactNative.onScreenChanged(event.componentName);
     });
   },
   setupNavigation(navigationRef: any) { // react-navigation
     navigationRef.addListener('state', (_ : any) => {
        let routeName = "/" + navigationRef.getCurrentRoute().name;
        StonlyReactNative.onScreenChanged(routeName);
     });
   }
}
