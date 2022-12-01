import {NativeModules, NativeEventEmitter} from 'react-native';
const {StonlyWidget, LinkingManager} = NativeModules;
//Stonly interface

const eventEmitter = new NativeEventEmitter(StonlyWidget);
const linkingEventEmitter = new NativeEventEmitter(LinkingManager);

const Stonly = {
  addListener: function (eventName, listener) {
    eventEmitter.addListener(eventName, listener);
  },

  removeAllListeners: function (eventName) {
    eventEmitter.removeAllListeners(eventName);
  },

  setWidgetId: function (widgetId) {
    StonlyWidget.setWidgetId(widgetId);
  },

  setDebugEnabled: function (debugEnabled) {
    StonlyWidget.setDebugEnabled(debugEnabled);
  },

  setWizardEnabled: function (wizardEnabled) {
    linkingEventEmitter.removeAllListeners('url');
    if (wizardEnabled) {
      linkingEventEmitter.addListener('url', event => {
        console.log(event);
        StonlyWidget.handleURL(event.url);
      });
    }
  },

  setMonitoringEnabled: function (monitoringEnabled) {
    StonlyWidget.setMonitoringEnabled(monitoringEnabled);
  },

  setSegmentAnonymousId: function (segmentAnonymousId) {
    StonlyWidget.setSegmentAnonymousId(segmentAnonymousId);
  },

  sendData: function (dataObject) {
    StonlyWidget.sendData(dataObject);
  },

  clearSentData: function () {
    StonlyWidget.clearSentData();
  },

  setWidgetLanguage: function (languageCode) {
    StonlyWidget.setWidgetLanguage(languageCode);
  },

  setWindowLevel: function (windowLevel) {
    StonlyWidget.setWindowLevel(windowLevel);
  },

  openGuide: function (guideId, stepId = null, widgetOptions = {}) {
    StonlyWidget.openGuide(guideId, stepId, widgetOptions);
  },

  openGuidedTour: function (guideId, stepId = null) {
    StonlyWidget.openGuidedTour(guideId, stepId);
  },

  openKnowledgeBase: function (teamKnowledgeBaseId, folderId = null) {
    StonlyWidget.openKnowledgeBase(teamKnowledgeBaseId, folderId);
  },

  closeWidget: function (widgetRuleId) {
    StonlyWidget.closeWidget(widgetRuleId);
  },

  identify: function (customerId, properties = {}) {
    StonlyWidget.identify(customerId, properties);
  },

  track: function (eventName) {
    StonlyWidget.track(eventName);
  },
};

export default Stonly;
