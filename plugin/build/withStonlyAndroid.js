"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStonlyAndroid = void 0;
const config_plugins_1 = require("expo/config-plugins");
// Helper function to add Stonly imports and initialization to MainApplication.kt
function addStonlyToMainApplication(contents, widgetId) {
    // Add import if not already present
    const importLine = 'import com.stonlyreactnative.StonlyReactNativeModule;';
    if (!contents.includes(importLine)) {
        // Find the class MainApplication line and add import before it
        const classRegex = /(class MainApplication)/;
        if (classRegex.test(contents)) {
            contents = contents.replace(classRegex, `${importLine}\n\n$1`);
        }
        else {
            // Fallback: add at the beginning of the file after package declaration
            const packageRegex = /(package\s+[^;]+[\s\S]*?\n)/;
            contents = contents.replace(packageRegex, `$1\n${importLine}\n`);
        }
    }
    // Add setWidgetId call in onCreate method
    const setWidgetIdLine = `if (!StonlyReactNativeModule.setWidgetIdFromStorage(this)) {    StonlyReactNativeModule.Companion.setWidgetId("${widgetId}", this)  }`;
    if (!contents.includes('StonlyReactNativeModule.Companion.setWidgetId')) {
        const onCreateRegex = /(ApplicationLifecycleDispatcher\.onApplicationCreate\(this\))/;
        if (onCreateRegex.test(contents)) {
            contents = contents.replace(onCreateRegex, `$1\n${setWidgetIdLine}`);
        }
        else {
            // Fallback: add at the end of onCreate method
            const onCreateEndRegex = /(override fun onCreate\(\) \{[\s\S]*?)(super\.onCreate\(\)[\s\S]*?)(\s+\})/;
            contents = contents.replace(onCreateEndRegex, `$1$2\n${setWidgetIdLine}$3`);
        }
    }
    return contents;
}
// Helper function to add onResume method to MainActivity.kt
function addOnResumeToMainActivity(contents) {
    // Add import if not already present
    const importLine = 'import com.stonlyreactnative.StonlyReactNativeModule;';
    if (!contents.includes(importLine)) {
        // Find the class MainActivity line and add import before it
        const classRegex = /(class MainActivity)/;
        if (classRegex.test(contents)) {
            contents = contents.replace(classRegex, `${importLine}\n\n$1`);
        }
        else {
            // Fallback: add at the beginning of the file after package declaration
            const packageRegex = /(package\s+[^;]+[\s\S]*?\n)/;
            contents = contents.replace(packageRegex, `$1\n${importLine}\n`);
        }
    }
    // Add onResume method if not already present
    const onResumeMethod = `
  override fun onResume() {
    super.onResume()
    StonlyReactNativeModule.Companion.register(getIntent())
  }`;
    if (!contents.includes('StonlyReactNativeModule.Companion.register')) {
        // Find the end of onCreate method and add onResume after it
        const onCreateEndRegex = /(override fun onCreate\([\s\S]*?\n\s+\})/;
        contents = contents.replace(onCreateEndRegex, `$1\n${onResumeMethod}`);
    }
    return contents;
}
const withStonlyAndroid = (config, { widgetId, androidUrlScheme }) => {
    // Add modifications to MainApplication.kt
    config = (0, config_plugins_1.withMainApplication)(config, (config) => {
        if (config.modResults.contents) {
            config.modResults.contents = addStonlyToMainApplication(config.modResults.contents, widgetId);
        }
        return config;
    });
    // Add modifications to MainActivity.kt
    config = (0, config_plugins_1.withMainActivity)(config, (config) => {
        if (config.modResults.contents) {
            config.modResults.contents = addOnResumeToMainActivity(config.modResults.contents);
        }
        return config;
    });
    // Add URL scheme(s) to AndroidManifest.xml if provided
    if (androidUrlScheme) {
        // Normalize to array for consistent processing
        const schemes = Array.isArray(androidUrlScheme) ? androidUrlScheme : [androidUrlScheme];
        config = (0, config_plugins_1.withAndroidManifest)(config, (config) => {
            var _a;
            const mainActivity = config_plugins_1.AndroidConfig.Manifest.getMainActivityOrThrow(config.modResults);
            // Find existing intent-filter or create new one
            let intentFilter = (_a = mainActivity['intent-filter']) === null || _a === void 0 ? void 0 : _a.find((filter) => { var _a; return (_a = filter.data) === null || _a === void 0 ? void 0 : _a.some((data) => { var _a; return (_a = data.$) === null || _a === void 0 ? void 0 : _a['android:scheme']; }); });
            if (!intentFilter) {
                // Create new intent-filter for deep links
                intentFilter = {
                    action: [{ $: { 'android:name': 'android.intent.action.VIEW' } }],
                    category: [
                        { $: { 'android:name': 'android.intent.category.DEFAULT' } },
                        { $: { 'android:name': 'android.intent.category.BROWSABLE' } },
                    ],
                    data: [],
                };
                if (!mainActivity['intent-filter']) {
                    mainActivity['intent-filter'] = [];
                }
                mainActivity['intent-filter'].push(intentFilter);
            }
            // Add each scheme if it doesn't exist
            schemes.forEach((scheme) => {
                var _a;
                const existingScheme = (_a = intentFilter.data) === null || _a === void 0 ? void 0 : _a.find((data) => { var _a; return ((_a = data.$) === null || _a === void 0 ? void 0 : _a['android:scheme']) === scheme; });
                if (!existingScheme) {
                    if (!intentFilter.data) {
                        intentFilter.data = [];
                    }
                    intentFilter.data.push({
                        $: { 'android:scheme': scheme },
                    });
                }
            });
            return config;
        });
    }
    return config;
};
exports.withStonlyAndroid = withStonlyAndroid;
