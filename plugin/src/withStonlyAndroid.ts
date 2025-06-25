import type { ConfigPlugin } from 'expo/config-plugins';
import {
  AndroidConfig,
  withAndroidManifest,
  withMainActivity,
  withMainApplication,
} from 'expo/config-plugins';
import type { StonlyPluginProps } from './withStonly';

// Helper function to add Stonly imports and initialization to MainApplication.kt
function addStonlyToMainApplication(
  contents: string,
  widgetId: string
): string {
  // Add import if not already present
  const importLine = 'import com.stonlyreactnative.StonlyReactNativeModule;';
  if (!contents.includes(importLine)) {
    // Find the class MainApplication line and add import before it
    const classRegex = /(class MainApplication)/;
    if (classRegex.test(contents)) {
      contents = contents.replace(classRegex, `${importLine}\n\n$1`);
    } else {
      // Fallback: add at the beginning of the file after package declaration
      const packageRegex = /(package\s+[^;]+[\s\S]*?\n)/;
      contents = contents.replace(packageRegex, `$1\n${importLine}\n`);
    }
  }

  // Add setWidgetId call in onCreate method
  const setWidgetIdLine = `if (!StonlyReactNativeModule.setWidgetIdFromStorage(this)) {    StonlyReactNativeModule.Companion.setWidgetId("${widgetId}", this)  }`;

  if (!contents.includes('StonlyReactNativeModule.Companion.setWidgetId')) {
    const onCreateRegex =
      /(ApplicationLifecycleDispatcher\.onApplicationCreate\(this\))/;
    if (onCreateRegex.test(contents)) {
      contents = contents.replace(onCreateRegex, `$1\n${setWidgetIdLine}`);
    } else {
      // Fallback: add at the end of onCreate method
      const onCreateEndRegex =
        /(override fun onCreate\(\) \{[\s\S]*?)(super\.onCreate\(\)[\s\S]*?)(\s+\})/;
      contents = contents.replace(
        onCreateEndRegex,
        `$1$2\n${setWidgetIdLine}$3`
      );
    }
  }

  return contents;
}

// Helper function to add onResume method to MainActivity.kt
function addOnResumeToMainActivity(contents: string): string {
  // Add import if not already present
  const importLine = 'import com.stonlyreactnative.StonlyReactNativeModule;';
  if (!contents.includes(importLine)) {
    // Find the class MainActivity line and add import before it
    const classRegex = /(class MainActivity)/;
    if (classRegex.test(contents)) {
      contents = contents.replace(classRegex, `${importLine}\n\n$1`);
    } else {
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

export const withStonlyAndroid: ConfigPlugin<StonlyPluginProps> = (
  config,
  { widgetId, androidUrlScheme }
) => {
  // Add modifications to MainApplication.kt
  config = withMainApplication(config, (config) => {
    if (config.modResults.contents) {
      config.modResults.contents = addStonlyToMainApplication(
        config.modResults.contents,
        widgetId
      );
    }
    return config;
  });

  // Add modifications to MainActivity.kt
  config = withMainActivity(config, (config) => {
    if (config.modResults.contents) {
      config.modResults.contents = addOnResumeToMainActivity(
        config.modResults.contents
      );
    }
    return config;
  });

  // Add URL scheme(s) to AndroidManifest.xml if provided
  if (androidUrlScheme) {
    // Normalize to array for consistent processing
    const schemes = Array.isArray(androidUrlScheme)
      ? androidUrlScheme
      : [androidUrlScheme];

    config = withAndroidManifest(config, (config) => {
      const mainActivity = AndroidConfig.Manifest.getMainActivityOrThrow(
        config.modResults
      );

      // Find existing intent-filter or create new one
      let intentFilter = mainActivity['intent-filter']?.find((filter: any) =>
        filter.data?.some((data: any) => data.$?.['android:scheme'])
      );

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
        const existingScheme = intentFilter.data?.find(
          (data: any) => data.$?.['android:scheme'] === scheme
        );

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
