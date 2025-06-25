"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStonlyIOS = void 0;
const config_plugins_1 = require("expo/config-plugins");
// Helper function to add Stonly configuration to AppDelegate.swift
function addStonlyToAppDelegate(contents, widgetId) {
    // Check if this is a Swift file by looking for Expo SDK 53+ markers
    const isSwiftFile = contents.includes('import Expo') ||
        contents.includes('@UIApplicationMain') ||
        contents.includes('ExpoAppDelegate');
    if (isSwiftFile) {
        return addStonlyToSwiftAppDelegate(contents, widgetId);
    }
    else {
        // Fallback for Objective-C (legacy support)
        return addStonlyToObjCAppDelegate(contents, widgetId);
    }
}
// Swift AppDelegate configuration for Expo SDK 53+
function addStonlyToSwiftAppDelegate(contents, widgetId) {
    // Add Stonly import if not already present
    const stonlyImport = 'import Stonly';
    if (!contents.includes(stonlyImport)) {
        // Add import after Expo import
        const expoImportRegex = /(import Expo\n)/;
        if (expoImportRegex.test(contents)) {
            contents = contents.replace(expoImportRegex, `$1${stonlyImport}\n`);
        }
        else {
            // Fallback: add after first import
            const firstImportRegex = /(import .*?\n)/;
            contents = contents.replace(firstImportRegex, `$1${stonlyImport}\n`);
        }
    }
    // Add widgetId configuration in application(_:didFinishLaunchingWithOptions:)
    const widgetIdLine = `    Stonly.Widget.widgetId = "${widgetId}"`;
    if (!contents.includes('Stonly.Widget.widgetId')) {
        // Find the didFinishLaunchingWithOptions method and add configuration before return statement
        const didFinishRegex = /(return super\.application\(application, didFinishLaunchingWithOptions: launchOptions\))/;
        if (didFinishRegex.test(contents)) {
            contents = contents.replace(didFinishRegex, `${widgetIdLine}\n\n    $1`);
        }
    }
    // Add openURL handler if not already present
    const openURLMethod = `
  // Stonly URL handling
  public override func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    Stonly.Widget.handleURL(url)
    return super.application(app, open: url, options: options) || RCTLinkingManager.application(app, open: url, options: options)
  }`;
    if (!contents.includes('Stonly.Widget.handleURL')) {
        // Check if there's already an openURL method
        const existingOpenURLRegex = /public override func application\(\s*_ app: UIApplication,\s*open url: URL/;
        if (existingOpenURLRegex.test(contents)) {
            // Add Stonly.Widget.handleURL to existing method
            const openURLRegex = /(public override func application\(\s*_ app: UIApplication,\s*open url: URL[^{]*\{)/;
            contents = contents.replace(openURLRegex, `$1\n    Stonly.Widget.handleURL(url)`);
        }
        else {
            // Add new openURL method before the closing brace of AppDelegate class
            const classEndRegex = /(}\s*class ReactNativeDelegate)/;
            if (classEndRegex.test(contents)) {
                contents = contents.replace(classEndRegex, `${openURLMethod}\n$1`);
            }
            else {
                // Fallback: add before the last closing brace of the file
                const lastBraceRegex = /(\n}\s*$)/;
                contents = contents.replace(lastBraceRegex, `${openURLMethod}$1`);
            }
        }
    }
    return contents;
}
// Legacy Objective-C AppDelegate configuration for older SDK versions
function addStonlyToObjCAppDelegate(contents, widgetId) {
    // Add Stonly import if not already present
    const stonlyImport = '#import <Stonly/Stonly-Swift.h>';
    if (!contents.includes(stonlyImport)) {
        // Add import after React imports
        const importRegex = /(#import <React\/.*?>\n)/g;
        const imports = contents.match(importRegex) || [];
        if (imports.length > 0) {
            const lastReactImport = imports[imports.length - 1];
            if (lastReactImport) {
                contents = contents.replace(lastReactImport, `${lastReactImport}${stonlyImport}\n`);
            }
        }
        else {
            // Fallback: add after first import
            const firstImportRegex = /(#import .*?\n)/;
            contents = contents.replace(firstImportRegex, `$1${stonlyImport}\n`);
        }
    }
    // Add widgetId configuration in didFinishLaunchingWithOptions
    const widgetIdLine = `  StonlyWidget.widgetId = @"${widgetId}";`;
    if (!contents.includes('StonlyWidget.widgetId')) {
        const didFinishRegex = /(self\.initialProps = @\{\};)/;
        if (didFinishRegex.test(contents)) {
            contents = contents.replace(didFinishRegex, `$1\n\n${widgetIdLine}`);
        }
        else {
            // Fallback: add before return statement in didFinishLaunchingWithOptions
            const returnRegex = /(- \(BOOL\)application:\(UIApplication \*\)application didFinishLaunchingWithOptions:[\s\S]*?)(return \[super application:application didFinishLaunchingWithOptions:launchOptions\];)/;
            contents = contents.replace(returnRegex, `$1${widgetIdLine}\n  $2`);
        }
    }
    // Add openURL handler if not already present
    const openURLMethod = `- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  [StonlyWidget handleURL:url];
  return [RCTLinkingManager application:application openURL:url options:options];
}`;
    if (!contents.includes('[StonlyWidget handleURL:url]')) {
        // Check if openURL method already exists
        const existingOpenURLRegex = /- \(BOOL\)application:\(UIApplication \*\)application\s+openURL:\(NSURL \*\)url\s+options:/;
        if (existingOpenURLRegex.test(contents)) {
            // Add StonlyWidget.handleURL to existing method
            const openURLRegex = /(- \(BOOL\)application:\(UIApplication \*\)application\s+openURL:\(NSURL \*\)url\s+options:[\s\S]*?\{)/;
            contents = contents.replace(openURLRegex, `$1\n  [StonlyWidget handleURL:url];`);
        }
        else {
            // Add new openURL method before @end
            const endRegex = /(@end)/;
            contents = contents.replace(endRegex, `\n${openURLMethod}\n\n$1`);
        }
    }
    return contents;
}
const withStonlyIOS = (config, { widgetId, iosUrlScheme }) => {
    // Add modifications to Info.plist
    if (iosUrlScheme) {
        // Normalize to array for consistent processing
        const schemes = Array.isArray(iosUrlScheme) ? iosUrlScheme : [iosUrlScheme];
        config = (0, config_plugins_1.withInfoPlist)(config, (config) => {
            const urlTypes = config.modResults.CFBundleURLTypes || [];
            schemes.forEach((scheme) => {
                // Check if URL scheme already exists
                const existingUrlType = urlTypes.find((urlType) => { var _a; return (_a = urlType.CFBundleURLSchemes) === null || _a === void 0 ? void 0 : _a.includes(scheme); });
                if (!existingUrlType) {
                    // Find existing URL type or create new one
                    let urlType = urlTypes.find((urlType) => urlType.CFBundleURLSchemes && urlType.CFBundleURLSchemes.length > 0);
                    if (urlType) {
                        // Add to existing URL type
                        urlType.CFBundleURLSchemes.push(scheme);
                    }
                    else {
                        // Create new URL type
                        urlTypes.push({
                            CFBundleURLSchemes: [scheme],
                        });
                    }
                }
            });
            config.modResults.CFBundleURLTypes = urlTypes;
            return config;
        });
    }
    // Add modifications to AppDelegate (Swift or Objective-C)
    config = (0, config_plugins_1.withAppDelegate)(config, (config) => {
        if (config.modResults.contents) {
            config.modResults.contents = addStonlyToAppDelegate(config.modResults.contents, widgetId);
        }
        return config;
    });
    return config;
};
exports.withStonlyIOS = withStonlyIOS;
