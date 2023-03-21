"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stonly = void 0;
var _navigationManager = require("./navigationManager");
var _trackerManager = require("./trackerManager");
var _configManager = require("./configManager");
var _widgetManager = require("./widgetManager");
const Stonly = {
  setupNavigation(navigation) {
    _navigationManager.NavigationManager.setupNavigation(navigation);
  },
  setupNativeNavigation(navigationRef) {
    _navigationManager.NavigationManager.setupNativeNavigation(navigationRef);
  },
  identify(customerId) {
    let properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _trackerManager.TrackerManager.identify(customerId, properties);
  },
  track(eventName) {
    _trackerManager.TrackerManager.track(eventName);
  },
  setDebugEnabled(debugEnabled) {
    _configManager.ConfigManager.setDebugEnabled(debugEnabled);
  },
  setMonitoringEnabled(monitoringEnabled) {
    _configManager.ConfigManager.setMonitoringEnabled(monitoringEnabled);
  },
  setSegmentAnonymousId(segmentAnonymousId) {
    _configManager.ConfigManager.setSegmentAnonymousId(segmentAnonymousId);
  },
  setWidgetLanguage(languageCode) {
    _configManager.ConfigManager.setWidgetLanguage(languageCode);
  },
  sendData(dataObject) {
    _widgetManager.WidgetManager.sendData(dataObject);
  },
  clearSentData() {
    _widgetManager.WidgetManager.clearSentData();
  },
  setWindowLevel(windowLevel) {
    _widgetManager.WidgetManager.setWindowLevel(windowLevel);
  },
  openGuide(guideId) {
    let stepId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let widgetOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _widgetManager.WidgetManager.openGuide(guideId, stepId, widgetOptions);
  },
  openGuidedTour(guideId) {
    let stepId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _widgetManager.WidgetManager.openGuidedTour(guideId, stepId);
  },
  openKnowledgeBase(teamKnowledgeBaseId) {
    let folderId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _widgetManager.WidgetManager.openKnowledgeBase(teamKnowledgeBaseId, folderId);
  },
  closeWidget(widgetRuleId) {
    _widgetManager.WidgetManager.closeWidget(widgetRuleId);
  },
  setStonlyEnabled(enabled) {
    _widgetManager.WidgetManager.setStonlyEnabled(enabled);
  }
};
exports.Stonly = Stonly;
//# sourceMappingURL=index.js.map