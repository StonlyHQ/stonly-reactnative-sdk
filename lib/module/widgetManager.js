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
export const WidgetManager = {
  sendData(dataObject) {
    StonlyReactNative.sendData(dataObject);
  },
  clearSentData() {
    StonlyReactNative.clearSentData();
  },
  setWindowLevel(windowLevel) {
    StonlyReactNative.setWindowLevel(windowLevel);
  },
  openGuide(guideId) {
    let stepId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let widgetOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    StonlyReactNative.openGuide(guideId, stepId, widgetOptions);
  },
  openGuidedTour(guideId) {
    let stepId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    StonlyReactNative.openGuidedTour(guideId, stepId);
  },
  openKnowledgeBase(teamKnowledgeBaseId) {
    let folderId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    StonlyReactNative.openKnowledgeBase(teamKnowledgeBaseId, folderId);
  },
  closeWidget(widgetRuleId) {
    StonlyReactNative.closeWidget(widgetRuleId);
  },
  setStonlyEnabled(enabled) {
    StonlyReactNative.setStonlyEnabled(enabled);
  }
};
//# sourceMappingURL=widgetManager.js.map