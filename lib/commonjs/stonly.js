// import { NativeModules, NativeEventEmitter } from 'react-native';
// const { StonlyWidget, LinkingManager } = NativeModules;
// //Stonly interface
//
// const eventEmitter = new NativeEventEmitter(StonlyWidget);
// const linkingEventEmitter = new NativeEventEmitter(LinkingManager);
//
// const Stonly = {
//   addListener: function (eventName: string, listener: any) {
//     eventEmitter.addListener(eventName, listener);
//   },
//
//   removeAllListeners: function (eventName: string) {
//     eventEmitter.removeAllListeners(eventName);
//   },
//
//   setWizardEnabled: function (wizardEnabled: boolean) {
//     linkingEventEmitter.removeAllListeners('url');
//     if (wizardEnabled) {
//       linkingEventEmitter.addListener('url', (event: any) => {
//         StonlyWidget.handleURL(event.url);
//       });
//     }
//   },
//
// };
//
// export default Stonly;
"use strict";
//# sourceMappingURL=stonly.js.map