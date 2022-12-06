package com.stonlyreactnative

import android.app.Application
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.stonly.stonly.Stonly

class StonlyReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun onScreenChanged(screenName: String, index: Int) {
    Stonly.onScreenChanged(screenName, index)
  }

  @ReactMethod
  fun setWidgetId(widgetId: String) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun setDebugEnabled(debugEnabled: Boolean) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun setMonitoringEnabled(debugEnabled: Boolean) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun setSegmentAnonymousId(segmentAnonymousId: String) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun sendData(widgetId: Any) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun clearSentData() {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun setWidgetLanguage(languageCode: String) {
    Stonly.setWidgetLanguage(languageCode)
  }

  @ReactMethod
  fun setWindowLevel(windowLever : Int) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun openGuide(guideId: String, stepId: String, widgetOptions: Any) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun openGuidedTour(guideId: String, stepId: String) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun openKnowledgeBase(teamKnowledgeBaseId: String, folderId: String) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun closeWidget(widgetRuleId: String) {
    Log.d(NAME, "This function doesn't exist on Android")
  }

  @ReactMethod
  fun identify(customerId: String, properties: String) {
    Stonly.tracker?.identify(customerId)
  }

  @ReactMethod
  fun track(eventName: String) {
    Stonly.tracker?.track(eventName)
  }

  companion object {
    const val NAME = "StonlyReactNative"

    fun setWidgetId(key: String, application: Application) {
      Stonly.setWidgetId(key, application)
    }
  }
}
