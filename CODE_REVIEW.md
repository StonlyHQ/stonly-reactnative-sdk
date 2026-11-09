# Code review

Repo-specific checks for the React Native SDK. `om-code-review` applies them on top of its built-in
checklist.

## Checks

| Check | Severity when it fails |
|---|---|
| A path can crash the host: unhandled promise rejection, uncaught native exception, unchecked JS value sent to native | High |
| Public JS API changed without a `CHANGELOG.md` entry | High |
| Native method added on one platform only, with no JS fallback | High |
| Hand edit in `lib/` or `plugin/build/` instead of the source | Medium |
| Logic that belongs in the native SDK added to the bridge | Medium |
| Navigation change without a test in `src/__tests__/` | Medium |
| Expo plugin change without a check against `EXPO_PLUGIN_GUIDE.md` | Low |

## Evidence

A UI or trigger-placement change needs a screenshot from the boilerplate test app on the affected
platform. A crash fix needs a test that fails without the fix.
