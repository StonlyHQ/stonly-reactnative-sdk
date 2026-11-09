# Stonly React Native SDK — CLAUDE.md

React Native bridge (`stonly-react-native` on npm) over the native Stonly SDKs, plus an Expo config
plugin. TypeScript API in `src/`, native modules in `android/` (Kotlin) and `ios/` (Swift + ObjC),
Expo plugin in `plugin/`. It runs inside host apps, so it **must never crash or block the host**.

## Critical Rules

1. **Never crash the host**: a native call that fails is caught and logged; a bad value from JS is
   checked before it crosses the bridge.
2. **Keep the bridge thin**: behavior belongs in the native SDKs (`stonly-android-library`,
   `stonly-ios-library`); the bridge maps calls and navigation state.
3. **Public JS API is a customer contract**: changes in `src/index.tsx` are breaking-change
   candidates and need a `CHANGELOG.md` entry.
4. **Both platforms move together**: a method added to one native module is added to the other, or
   the JS side handles its absence.
5. `plugin/build/` and `lib/` are generated: change `plugin/src/` and `src/`, then rebuild
   (`yarn prepare`).

## Build Commands

```bash
yarn install --frozen-lockfile --ignore-scripts && (cd plugin && npm install --no-audit --no-fund --no-save)
npx eslint "**/*.{js,ts,tsx}"
npx tsc --noEmit
yarn test --ci
yarn prepare        # builds lib/ (bob) and plugin/build/
```

The first four are the validation gate in `.ai/agentic.config.json`. Releases go through
`release-it` (`yarn release`) from the Jenkins release job.

## Layout

| Path | Purpose |
|---|---|
| `src/index.tsx` | Public API |
| `src/widgetManager.ts`, `src/configManager.ts`, `src/trackerManager.ts` | Calls into the native module |
| `src/navigationManager.ts` | React Navigation state → native route |
| `android/…/StonlyReactNativeModule.kt` | Android native module |
| `ios/StonlyReactNative.swift`, `ios/RCTStonlyModule.m` | iOS native module |
| `plugin/src/` | Expo config plugin (see `EXPO_PLUGIN_GUIDE.md`) |

## When Working On...

| Task | Load |
|---|---|
| Expo plugin | `EXPO_PLUGIN_GUIDE.md`, `PLUGIN_IMPLEMENTATION.md` |
| Publishing | `CONTRIBUTING.md` |
| Code review | `CODE_REVIEW.md` |

## Common Pitfalls

- Routes: native receives the route without the leading slash (`/a?x=1` → `a?x=1`).
- Navigation state changes without a current route are ignored, not sent.
- Wizard pairing must work on cold and warm start (Android: `onNewIntent` does not change
  `getIntent`).
- iOS element triggers need `testID` on the target view.
- The test app lives in the parent repo (`stonly-react-library/boilerplate-ignite`), which pins this
  repo as a submodule.

## AI Workflow

The shared Stonly workflow comes from the `stonly` Claude Code plugin, installed per machine (not
configured in this repo); its session-start menu lists which skill starts which task. The om-*
pipeline reads `.ai/agentic.config.json` (validation gate, base branch `main`) and `.ai/trackers/`
(Jira issues, GitHub PRs through `gh`). Keep the scratchpad protocol from the menu; finish with
`/stonly:capture-knowledge`.

## Commit Convention

```
type(scope): [STON-XXXX] message
```

Types: feat, fix, refactor, docs, test, chore, perf. Version bumps: `chore(release): message`.
`.githooks/commit-msg` and `commitlint.config.js` enforce it; enable the hook once per clone with
`git config core.hooksPath .githooks`.
