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

export function multiply(a: number, b: number): Promise<number> {
  console.log('Hello');
  return StonlyReactNative.multiply(a, b);
}

export function setup(navigation: any) {
  navigation.events().registerComponentDidAppearListener((event : any) => {
    console.log('stonly event', event); //  componentName: 'Home',componentId: 'Component1',
    StonlyReactNative.onScreenChanged(event.componentName, -1);
  });
}

export function setNavigation(navigationRef: any) {
  navigationRef.addListener('state', (e : any) => {
    let routeName = '';
    let index = null;
    e.data.state?.routes?.forEach((element : any) => {
      index = element.state?.index;
      if (typeof element === 'string') {
        routeName += '/' + element;
      }
      // type = element.data.state?.type
      if (element.state && element.state?.routeNames && index) {
        routeName = '/' + element.state?.routeNames[index];
      }
      console.log('stonly event index: ', index);
    });
    console.log('stonly event routeName: ', routeName);
    console.log('stonly event index: ', index);
    StonlyReactNative.onScreenChanged(routeName, index);
  });
}
