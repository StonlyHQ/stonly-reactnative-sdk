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

export const WidgetManager = {
   sendData(dataObject: object) {
     StonlyReactNative.sendData(dataObject);
   },
   clearSentData() {
     StonlyReactNative.clearSentData();
   },
   setWindowLevel(windowLevel: number) {
     StonlyReactNative.setWindowLevel(windowLevel);
   },
   openGuide(guideId: string, stepId = null, widgetOptions = {}) {
     StonlyReactNative.openGuide(guideId, stepId, widgetOptions);
   },
   openGuidedTour(guideId: string, stepId = null) {
     StonlyReactNative.openGuidedTour(guideId, stepId);
   },
   openKnowledgeBase(teamKnowledgeBaseId: string, folderId = null) {
     StonlyReactNative.openKnowledgeBase(teamKnowledgeBaseId, folderId);
   },
   closeWidget(widgetRuleId: string) {
     StonlyReactNative.closeWidget(widgetRuleId);
   }
}
