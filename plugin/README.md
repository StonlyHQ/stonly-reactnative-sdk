# Stonly React Native Expo Plugin

An Expo config plugin for automatic configuration of Stonly React Native SDK.

## Installation

This plugin is included with the `stonly-react-native` package and doesn't need to be installed separately.

## Usage

Add the plugin to your `app.config.js` or `expo.json`:

```javascript
// app.config.js
export default {
  expo: {
    // ... other config
    plugins: [
      [
        "stonly-react-native/plugin",
        {
          widgetId: "your-widget-id-here",
          iosUrlScheme: "your-ios-scheme", // optional - string or array of strings
          androidUrlScheme: "your-android-scheme", // optional - string or array of strings
        },
      ],
    ],
  },
};
```

### Multiple URL Schemes

You can also provide multiple URL schemes as an array:

```javascript
// app.config.js
export default {
  expo: {
    // ... other config
    plugins: [
      [
        "stonly-react-native/plugin",
        {
          widgetId: "your-widget-id-here",
          iosUrlScheme: ["scheme1", "scheme2", "scheme3"],
          androidUrlScheme: ["scheme1", "scheme2"],
        },
      ],
    ],
  },
};
```

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `widgetId` | string | Yes | Your Stonly widget ID |
| `iosUrlScheme` | string \| string[] | No | Custom URL scheme(s) for iOS deep linking |
| `androidUrlScheme` | string \| string[] | No | Custom URL scheme(s) for Android deep linking |

## What the plugin does

### Android
- Adds `StonlyReactNativeModule.Companion.setWidgetId()` call to `MainApplication.kt`
- Adds `onResume()` method with `StonlyReactNativeModule.Companion.register()` to `MainActivity.kt`
- Adds URL scheme(s) to `AndroidManifest.xml` (if provided)

### iOS
- Sets `Stonly.Widget.widgetId` in `AppDelegate.swift` (SDK 53+) or `StonlyWidget.widgetId` in `AppDelegate.mm` (SDK 52 and below)
- Adds `openURL` handler with `Stonly.Widget.handleURL()` in `AppDelegate.swift` (SDK 53+) or `StonlyWidget.handleURL()` in `AppDelegate.mm` (SDK 52 and below)
- Adds URL scheme(s) to `Info.plist` CFBundleURLSchemes (if provided)

## Usage after plugin setup

After running `expo prebuild`, your app will be automatically configured for Stonly. You can then use the Stonly React Native SDK in your JavaScript code