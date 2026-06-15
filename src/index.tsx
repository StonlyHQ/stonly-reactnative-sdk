import { NavigationManager } from './navigationManager';
import { TrackerManager } from './trackerManager';
import { ConfigManager } from './configManager';
import type { StonlyDatacenter } from './configManager';
import { WidgetManager } from './widgetManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type { StonlyDatacenter } from './configManager';

export const Stonly = {
  setupNavigation(navigation: any) {
    NavigationManager.setupNavigation(navigation);
  },
  setupNativeNavigation(navigationRef: any) {
    NavigationManager.setupNativeNavigation(navigationRef);
  },
  identify(customerId: string, properties = {}) {
    TrackerManager.identify(customerId, properties);
  },
  track(eventName: string) {
    TrackerManager.track(eventName);
  },
  setDebugEnabled(debugEnabled: boolean) {
    ConfigManager.setDebugEnabled(debugEnabled);
  },
  setMonitoringEnabled(monitoringEnabled: boolean) {
    ConfigManager.setMonitoringEnabled(monitoringEnabled);
  },

  /**
   * Enables or disables SDK crash reporting to Stonly servers (Sentry).
   * Enabled by default — call with `false` to opt out.
   * For full silence, call before `setWidgetId`; calling at runtime
   * closes an already-started reporter.
   */
  setSentryEnabled(enabled: boolean) {
    ConfigManager.setSentryEnabled(enabled);
  },
  setSegmentAnonymousId(segmentAnonymousId: string) {
    ConfigManager.setSegmentAnonymousId(segmentAnonymousId);
  },
  setWidgetLanguage(languageCode: string) {
    ConfigManager.setWidgetLanguage(languageCode);
  },
  sendData(dataObject: object) {
    WidgetManager.sendData(dataObject);
  },
  clearSentData() {
    WidgetManager.clearSentData();
  },
  setWindowLevel(windowLevel: number) {
    WidgetManager.setWindowLevel(windowLevel);
  },
  openGuide(guideId: string, stepId: Number | null = null, widgetOptions = {}) {
    WidgetManager.openGuide(guideId, stepId, widgetOptions);
  },
  openGuidedTour(guideId: string, stepId: Number | null = null) {
    WidgetManager.openGuidedTour(guideId, stepId);
  },
  openKnowledgeBase(
    teamKnowledgeBaseId: string,
    folderId: Number | null = null
  ) {
    WidgetManager.openKnowledgeBase(teamKnowledgeBaseId, folderId);
  },
  closeWidget(widgetRuleId: string) {
    WidgetManager.closeWidget(widgetRuleId);
  },
  setStonlyEnabled(enabled: boolean) {
    WidgetManager.setStonlyEnabled(enabled);
  },
  async getWidgetId(): Promise<string> {
    return ConfigManager.getWidgetId();
  },

  /**
   * Initializes the Stonly SDK with the given widget id.
   *
   * @param datacenter Stonly datacenter (server region) the SDK connects to:
   * 'eu' (European, default) or 'us' (American).
   */
  async setWidgetId(widgetId: string, datacenter: StonlyDatacenter = 'eu') {
    ConfigManager.setWidgetId(widgetId, datacenter);
    // Save to AsyncStorage for persistence
    try {
      await AsyncStorage.setItem('@stonly_widget_id', widgetId);
      await AsyncStorage.setItem('@stonly_datacenter', datacenter);
    } catch (error) {
      console.warn('Failed to save widget ID to AsyncStorage:', error);
    }
  },
  async getStoredWidgetId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('@stonly_widget_id');
    } catch (error) {
      console.warn('Failed to get widget ID from AsyncStorage:', error);
      return null;
    }
  },
  async getStoredDatacenter(): Promise<StonlyDatacenter | null> {
    try {
      const stored = await AsyncStorage.getItem('@stonly_datacenter');
      return stored === 'eu' || stored === 'us' ? stored : null;
    } catch (error) {
      console.warn('Failed to get datacenter from AsyncStorage:', error);
      return null;
    }
  },
  setAuthorizedDomains(domains: string[]) {
    ConfigManager.setAuthorizedDomains(domains);
  },
};
