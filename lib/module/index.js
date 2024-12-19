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
  identify(customerId, properties = {}) {
    TrackerManager.identify(customerId, properties);
  },
  track(eventName) {
    TrackerManager.track(eventName);
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
  openGuide(guideId, stepId = null, widgetOptions = {}) {
    WidgetManager.openGuide(guideId, stepId, widgetOptions);
  },
  openGuidedTour(guideId, stepId = null) {
    WidgetManager.openGuidedTour(guideId, stepId);
  },
  openKnowledgeBase(teamKnowledgeBaseId, folderId = null) {
    WidgetManager.openKnowledgeBase(teamKnowledgeBaseId, folderId);
  },
  closeWidget(widgetRuleId) {
    WidgetManager.closeWidget(widgetRuleId);
  },
  setStonlyEnabled(enabled) {
    WidgetManager.setStonlyEnabled(enabled);
  }
};
//# sourceMappingURL=index.js.map