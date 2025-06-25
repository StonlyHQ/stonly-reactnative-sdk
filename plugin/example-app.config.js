// Example app.config.js showing how to use the Stonly plugin

export default {
  expo: {
    name: "My App with Stonly",
    slug: "my-app-stonly",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "stonly-react-native/plugin",
        {
          widgetId: "00000000-0000-0000-0000-000000000000",
          // Single URL scheme (string)
          iosUrlScheme: "stonly-myapp",
          androidUrlScheme: "stonly-myapp"
          
          // Multiple URL schemes (array) - uncomment to use
          // iosUrlScheme: ["stonly-myapp", "myapp-support", "myapp-help"],
          // androidUrlScheme: ["stonly-myapp", "myapp-support"]
        }
      ]
    ]
  }
}; 