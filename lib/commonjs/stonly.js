// import { NativeModules, NativeEventEmitter } from 'react-native';
// const { StonlyWidget, LinkingManager } = NativeModules;
// //Stonly interface
//
// const eventEmitter = new NativeEventEmitter(StonlyWidget);
// const linkingEventEmitter = new NativeEventEmitter(LinkingManager);
//
// const Stonly = {
//   addListener: function (eventName: string, listener: any) {
//     eventEmitter.addListener(eventName, listener);
//   },
//
//   removeAllListeners: function (eventName: string) {
//     eventEmitter.removeAllListeners(eventName);
//   },
//
//   setWidgetId: function (widgetId: string) {
//     StonlyWidget.setWidgetId(widgetId);
//   },
//
//   setDebugEnabled: function (debugEnabled: boolean) {
//     StonlyWidget.setDebugEnabled(debugEnabled);
//   },
//
//   setWizardEnabled: function (wizardEnabled: boolean) {
//     linkingEventEmitter.removeAllListeners('url');
//     if (wizardEnabled) {
//       linkingEventEmitter.addListener('url', (event: any) => {
//         StonlyWidget.handleURL(event.url);
//       });
//     }
//   },
//
//   setMonitoringEnabled: function (monitoringEnabled: boolean) {
//     StonlyWidget.setMonitoringEnabled(monitoringEnabled);
//   },
//
//   setSegmentAnonymousId: function (segmentAnonymousId: string) {
//     StonlyWidget.setSegmentAnonymousId(segmentAnonymousId);
//   },
//
//   sendData: function (dataObject: object) {
//     StonlyWidget.sendData(dataObject);
//   },
//
//   clearSentData: function () {
//     StonlyWidget.clearSentData();
//   },
//
//   setWidgetLanguage: function (languageCode: string) {
//     StonlyWidget.setWidgetLanguage(languageCode);
//   },
//
//   setWindowLevel: function (windowLevel: number) {
//     StonlyWidget.setWindowLevel(windowLevel);
//   },
//
//   openGuide: function (guideId: string, stepId = null, widgetOptions = {}) {
//     StonlyWidget.openGuide(guideId, stepId, widgetOptions);
//   },
//
//   openGuidedTour: function (guideId: string, stepId = null) {
//     StonlyWidget.openGuidedTour(guideId, stepId);
//   },
//
//   openKnowledgeBase: function (teamKnowledgeBaseId: string, folderId = null) {
//     StonlyWidget.openKnowledgeBase(teamKnowledgeBaseId, folderId);
//   },
//
//   closeWidget: function (widgetRuleId: string) {
//     StonlyWidget.closeWidget(widgetRuleId);
//   },
//
//   identify: function (customerId: string, properties = {}) {
//     StonlyWidget.identify(customerId, properties);
//   },
//
//   track: function (eventName: string) {
//     StonlyWidget.track(eventName);
//   },
// };
//
// export default Stonly;
"use strict";
//# sourceMappingURL=stonly.js.map