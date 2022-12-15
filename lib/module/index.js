import { NavigationManager } from './navigationManager';
import { TrackerManager } from './trackerManager';
import { ConfigManager } from './configManager';
import { WidgetManager } from './widgetManager';
export const Stonly = {
  setupNavigation(navigation) {
    NavigationManager.setupNavigation(navigation);
  },
  setupNativeNavigation(navigationRef) {
    NavigationManager.setupNativeNavigation(navigationRef);
  },
  identify(customerId) {
    let properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    TrackerManager.identify(customerId, properties);
  },
  track(eventName) {
    TrackerManager.track(eventName);
  },
  setWidgetId(widgetId) {
    ConfigManager.setWidgetId(widgetId);
  },
  setDebugEnabled(debugEnabled) {
    ConfigManager.setDebugEnabled(debugEnabled);
  },
  setMonitoringEnabled(monitoringEnabled) {
    ConfigManager.setMonitoringEnabled(monitoringEnabled);
  },
  setSegmentAnonymousId(segmentAnonymousId) {
    ConfigManager.setSegmentAnonymousId(segmentAnonymousId);
  },
  setWidgetLanguage(languageCode) {
    ConfigManager.setWidgetLanguage(languageCode);
  },
  sendData(dataObject) {
    WidgetManager.sendData(dataObject);
  },
  clearSentData() {
    WidgetManager.clearSentData();
  },
  setWindowLevel(windowLevel) {
    WidgetManager.setWindowLevel(windowLevel);
  },
  openGuide(guideId) {
    let stepId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let widgetOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    WidgetManager.openGuide(guideId, stepId, widgetOptions);
  },
  openGuidedTour(guideId) {
    let stepId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    WidgetManager.openGuidedTour(guideId, stepId);
  },
  openKnowledgeBase(teamKnowledgeBaseId) {
    let folderId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    WidgetManager.openKnowledgeBase(teamKnowledgeBaseId, folderId);
  },
  closeWidget(widgetRuleId) {
    WidgetManager.closeWidget(widgetRuleId);
  }
};
//# sourceMappingURL=index.js.map