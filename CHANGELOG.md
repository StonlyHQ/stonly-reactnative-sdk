# Changelog

## 1.0.9

- Fix (Android): wizard pairing link opened while the app is running (warm start) is now used; previously the stale launch intent was re-registered on every resume.
- Fix (iOS): the widget id last set from JS is persisted and restored by the Expo plugin's AppDelegate, so a cold start opened by a pairing link boots the SDK for the same team (pairing fails when the app's team differs from the CMS team).

- Native SDK bump: Android `stonly-android-sdk` v1.0.28, iOS `Stonly` >= 1.0.37.
- iOS: export the missing bridge methods (`setWidgetLanguage`, `setDebugEnabled`, `setMonitoringEnabled`, `setSegmentAnonymousId`, `sendData`, `clearSentData`, `setWindowLevel`) – STON-13877.
- Android: `openGuide` accepts `widgetOptions` (placement) like iOS.
- Fix: react-navigation route names are sent to native without the leading `/`, so screen-bound mobile triggers match on Android again (STON-26069).
- Fix: screen changes without a current route are ignored instead of throwing.
- Docs: `setDebugEnabled` and Android trigger diagnostics logging; `testID` recommendation for element triggers on iOS.
