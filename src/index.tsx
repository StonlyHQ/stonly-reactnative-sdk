import { NavigationManager} from './navigationManager'
import { TrackerManager } from './trackerManager'
import { ConfigManager } from './configManager'
import { WidgetManager } from './widgetManager'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
   openGuide(guideId: string, stepId = null, widgetOptions = {}) {
     WidgetManager.openGuide(guideId, stepId, widgetOptions);
   },
   openGuidedTour(guideId: string, stepId = null) {
     WidgetManager.openGuidedTour(guideId, stepId);
   },
   openKnowledgeBase(teamKnowledgeBaseId: string, folderId = null) {
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
   
   async setWidgetId(widgetId: string) {
    ConfigManager.setWidgetId(widgetId);
    // Save to AsyncStorage for persistence
    try {
      await AsyncStorage.setItem('@stonly_widget_id', widgetId);
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
   setAuthorizedDomains(domains: string[]) {
    ConfigManager.setAuthorizedDomains(domains);
   }
}
