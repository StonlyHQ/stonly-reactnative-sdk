# stonly-react-native

Stonly implementation for React Native

## Installation

```sh
# npm
npm install stonly-react-native

# yarn
yarn add stonly-react-native

# pnpm
pnpm add stonly-react-native

# bun
bun add stonly-react-native
```

## Expo Configuration Plugin

For Expo projects, this package includes a configuration plugin that automatically sets up the necessary native code modifications.

### Usage with Expo

1. Add the plugin to your `app.config.js` or `expo.json`:

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
          iosUrlScheme: "your-ios-scheme", // optional
          androidUrlScheme: "your-android-scheme", // optional
        },
      ],
    ],
  },
};
```

2. Run `expo prebuild` to apply the configuration.

3. Build your app as usual.

### What the plugin does

The plugin automatically configures your project by:

**Android:**
- Adding `StonlyReactNativeModule.Companion.setWidgetId()` to `MainApplication.kt`
- Adding `onResume()` method with deep link handling to `MainActivity.kt`
- Adding URL scheme to `AndroidManifest.xml` (if provided)

**iOS:**
- Setting `Stonly.Widget.widgetId` in `AppDelegate.swift` (SDK 53+) or `StonlyWidget.widgetId` in `AppDelegate.mm` (SDK 52 and below)
- Adding URL handling with `Stonly.Widget.handleURL()` in `AppDelegate.swift` (SDK 53+) or `StonlyWidget.handleURL()` in `AppDelegate.mm` (SDK 52 and below)
- Adding URL scheme to `Info.plist` CFBundleURLSchemes (if provided)

## Manual Setup

If you're not using Expo or prefer manual setup, follow the platform-specific instructions below.

### Android Setup

1. Add to `MainApplication.kt`:
```kotlin
import com.stonlyreactnative.StonlyReactNativeModule

// In onCreate method:
StonlyReactNativeModule.Companion.setWidgetId("your-widget-id", this);
```

2. Add to `MainActivity.kt`:
```kotlin
import com.stonlyreactnative.StonlyReactNativeModule

override fun onResume() {
  super.onResume()
  StonlyReactNativeModule.Companion.register(getIntent())
}
```

3. Add URL scheme to `AndroidManifest.xml` (optional):
```xml
<data android:scheme="your-url-scheme"/>
```

### iOS Setup

#### For Expo SDK 53+ (Swift AppDelegate)

1. Add to `AppDelegate.swift`:
```swift
import UIKit
import Stonly

// In application(_:didFinishLaunchingWithOptions:)
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Stonly.Widget.widgetId = "your-widget-id"
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
}

// Add URL handling method:
func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    Stonly.Widget.handleURL(url)
    return super.application(application, open: url, options: options)
}
```

#### For Expo SDK 52 and below (Objective-C AppDelegate)

1. Add to `AppDelegate.mm`:
```objc
#import <Stonly/Stonly-Swift.h>

// In didFinishLaunchingWithOptions:
StonlyWidget.widgetId = @"your-widget-id";

// Add URL handling method:
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  [StonlyWidget handleURL:url];
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

2. Add URL scheme to `Info.plist` (optional):
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>your-url-scheme</string>
    </array>
  </dict>
</array>
```
 
## Usage

After configuration, you can use the Stonly widget in your JavaScript code
 
