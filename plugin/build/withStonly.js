'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const config_plugins_1 = require('expo/config-plugins');
const withStonlyAndroid_1 = require('./withStonlyAndroid');
const withStonlyIOS_1 = require('./withStonlyIOS');
const withStonly = (config, props) => {
  if (!(props === null || props === void 0 ? void 0 : props.widgetId)) {
    throw new Error('Stonly plugin requires a widgetId to be specified.');
  }
  return (0, config_plugins_1.withPlugins)(config, [
    [withStonlyAndroid_1.withStonlyAndroid, props],
    [withStonlyIOS_1.withStonlyIOS, props],
  ]);
};
exports.default = withStonly;
