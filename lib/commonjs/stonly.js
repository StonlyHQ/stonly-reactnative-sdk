"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const {
  StonlyWidget,
  LinkingManager
} = _reactNative.NativeModules;
//Stonly interface

const eventEmitter = new _reactNative.NativeEventEmitter(StonlyWidget);
const linkingEventEmitter = new _reactNative.NativeEventEmitter(LinkingManager);
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
  openGuide: function (guideId) {
    let stepId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let widgetOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    StonlyWidget.openGuide(guideId, stepId, widgetOptions);
  },
  openGuidedTour: function (guideId) {
    let stepId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    StonlyWidget.openGuidedTour(guideId, stepId);
  },
  openKnowledgeBase: function (teamKnowledgeBaseId) {
    let folderId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    StonlyWidget.openKnowledgeBase(teamKnowledgeBaseId, folderId);
  },
  closeWidget: function (widgetRuleId) {
    StonlyWidget.closeWidget(widgetRuleId);
  },
  identify: function (customerId) {
    let properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    StonlyWidget.identify(customerId, properties);
  },
  track: function (eventName) {
    StonlyWidget.track(eventName);
  }
};
var _default = Stonly;
exports.default = _default;
//# sourceMappingURL=stonly.js.map