import { NavigationManager } from './navigationManager';
import { TrackerManager } from './trackerManager';
import { ConfigManager } from './configManager';
import { WidgetManager } from './widgetManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  },
  async getWidgetId() {
    return ConfigManager.getWidgetId();
  },
  async setWidgetId(widgetId) {
    ConfigManager.setWidgetId(widgetId);
    // Save to AsyncStorage for persistence
    try {
      await AsyncStorage.setItem('@stonly_widget_id', widgetId);
    } catch (error) {
      console.warn('Failed to save widget ID to AsyncStorage:', error);
    }
  },
  async getStoredWidgetId() {
    try {
      return await AsyncStorage.getItem('@stonly_widget_id');
    } catch (error) {
      console.warn('Failed to get widget ID from AsyncStorage:', error);
      return null;
    }
  },
  setAuthorizedDomains(domains) {
    ConfigManager.setAuthorizedDomains(domains);
  }
};
//# sourceMappingURL=index.js.map