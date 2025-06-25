# Expo Plugin Guide for @stonly-reactnative-sdk

## Overview
The `@stonly-reactnative-sdk` Expo plugin automatically configures your React Native app's native code for Stonly integration.

## Installation

### 1. Install the SDK
```bash
npm install @stonly-reactnative-sdk
# or
yarn add @stonly-reactnative-sdk
```

### 2. Add Plugin to app.json
```json
{
  "expo": {
    "plugins": [
      [
        "@stonly-reactnative-sdk",
        {
          "widgetId": "your-widget-id",
          "iosUrlScheme": "your-app-scheme",
          "androidUrlScheme": "your-app-scheme"
        }
      ]
    ]
  }
}
```
 
### 3. Rebuild iOS
```bash
cd ios && pod install && cd ..
npx expo run:ios
```

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `widgetId` | string | ✅ Yes | Your Stonly widget ID |
| `iosUrlScheme` | string | ❌ No | URL scheme for iOS deep linking |
| `androidUrlScheme` | string | ❌ No | URL scheme for Android deep linking |

## What the Plugin Does

### ✅ Automatically Configured
- **Android**: Adds `StonlyReactNativeModule.setWidgetId()` to MainApplication.kt
- **Android**: Adds `onResume()` method with `StonlyReactNativeModule.register()` to MainActivity.kt
- **Android**: Configures URL scheme in AndroidManifest.xml (if provided)
- **iOS**: Adds `Stonly.Widget.widgetId` configuration to AppDelegate.swift (SDK 53+) or `StonlyWidget.widgetId` to AppDelegate.mm (SDK 52 and below)
- **iOS**: Adds `openURL` handler with `Stonly.Widget.handleURL()` to AppDelegate.swift (SDK 53+) or `StonlyWidget.handleURL()` to AppDelegate.mm (SDK 52 and below)
- **iOS**: Adds URL scheme to Info.plist (if provided)
 
### Plugin Not Working
1. Verify plugin configuration in `app.json`
2. Run `npx expo prebuild --clean` to regenerate native code
3. For iOS, run `cd ios && pod install && cd ..`
4. Check that the required manual Podfile configuration is present

### Existing Code Conflicts
The plugin intelligently detects existing Stonly configurations and won't duplicate them. If you have existing Stonly setup, the plugin will safely coexist.

## Example Complete Setup

```json
// app.json
{
  "expo": {
    "name": "MyApp",
    "plugins": [
      [
        "@stonly-reactnative-sdk",
        {
          "widgetId": "my-widget-123",
          "iosUrlScheme": "myapp",
          "androidUrlScheme": "myapp"
        }
      ]
    ]
  }
}
```
 

After this setup:
1. Run `npx expo prebuild --clean`
2. Run `cd ios && pod install && cd ..`
3. Run `npx expo run:ios` and `npx expo run:android`

## Support

For issues or questions: 
- Ensure all manual configuration steps are completed 