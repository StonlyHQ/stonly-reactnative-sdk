import { NavigationManager} from './navigationManager'
import { TrackerManager } from './trackerManager'
import { ConfigManager } from './configManager'
import { WidgetManager } from './widgetManager'

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
   setWidgetId(widgetId: string) {
     ConfigManager.setWidgetId(widgetId);
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
   }
}
