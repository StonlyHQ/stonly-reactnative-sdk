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
  /**
   * Enables or disables SDK crash reporting to Stonly servers (Sentry).
   * Enabled by default — call with `false` to opt out.
   * For full silence, call before `setWidgetId`; calling at runtime
   * closes an already-started reporter.
   */
  setSentryEnabled(enabled) {
    ConfigManager.setSentryEnabled(enabled);
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
  /**
   * Initializes the Stonly SDK with the given widget id.
   *
   * @param datacenter Stonly datacenter (server region) the SDK connects to:
   * 'eu' (European, default) or 'us' (American).
   */
  async setWidgetId(widgetId, datacenter = 'eu') {
    ConfigManager.setWidgetId(widgetId, datacenter);
    // Save to AsyncStorage for persistence
    try {
      await AsyncStorage.setItem('@stonly_widget_id', widgetId);
      await AsyncStorage.setItem('@stonly_datacenter', datacenter);
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
  async getStoredDatacenter() {
    try {
      const stored = await AsyncStorage.getItem('@stonly_datacenter');
      return stored === 'eu' || stored === 'us' ? stored : null;
    } catch (error) {
      console.warn('Failed to get datacenter from AsyncStorage:', error);
      return null;
    }
  },
  setAuthorizedDomains(domains) {
    ConfigManager.setAuthorizedDomains(domains);
  }
};
//# sourceMappingURL=index.js.map