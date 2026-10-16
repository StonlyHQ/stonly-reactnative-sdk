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
  openGuide(guideId, stepId = null, widgetOptions = {}) {
    if (Platform.OS === 'android') {
      if (stepId && stepId !== null) {
        StonlyReactNative.openGuide(guideId, `${stepId}`, widgetOptions);
      } else {
        StonlyReactNative.openGuide(guideId, null, widgetOptions);
      }
    } else {
      if (stepId && stepId !== null) {
        StonlyReactNative.openGuide(guideId, `${stepId}`, widgetOptions);
      } else {
        StonlyReactNative.openGuide(guideId, '', widgetOptions);
      }
    }
  },
  openGuidedTour(guideId, stepId = null) {
    if (Platform.OS === 'android') {
      if (stepId && stepId !== null) {
        StonlyReactNative.openGuidedTour(guideId, `${stepId}`);
      } else {
        StonlyReactNative.openGuidedTour(guideId, null);
      }
    } else {
      if (stepId && stepId !== null) {
        StonlyReactNative.openGuidedTour(guideId, `${stepId}`);
      } else {
        StonlyReactNative.openGuidedTour(guideId, '');
      }
    }
  },
  openKnowledgeBase(teamKnowledgeBaseId, folderId = null) {
    if (Platform.OS === 'android') {
      if (folderId && folderId !== null) {
        StonlyReactNative.openKnowledgeBase(teamKnowledgeBaseId, `${folderId}`);
      } else {
        StonlyReactNative.openKnowledgeBase(teamKnowledgeBaseId, null);
      }
    } else {
      if (folderId && folderId !== null) {
        StonlyReactNative.openKnowledgeBase(teamKnowledgeBaseId, `${folderId}`);
      } else {
        StonlyReactNative.openKnowledgeBase(teamKnowledgeBaseId, '');
      }
    }
  },
  closeWidget(widgetRuleId) {
    StonlyReactNative.closeWidget(widgetRuleId);
  },
  setStonlyEnabled(enabled) {
    StonlyReactNative.setStonlyEnabled(enabled);
  }
};
//# sourceMappingURL=widgetManager.js.map