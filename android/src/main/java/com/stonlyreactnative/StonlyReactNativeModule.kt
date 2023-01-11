package com.stonlyreactnative

import android.app.Application
import android.content.Intent
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

  //CONFIGURATION

  @ReactMethod
  fun setDebugEnabled(enabled: Boolean) {
    Stonly.setDebugEnabled(enabled)
  }

  @ReactMethod
  fun setMonitoringEnabled(enabled: Boolean) {
    Stonly.setMonitoringEnabled(enabled)
  }

  @ReactMethod
  fun setSegmentAnonymousId(segmentAnonymousId: String) {
    Stonly.setSegmentAnonymousId(segmentAnonymousId)
  }

  @ReactMethod
  fun setWidgetLanguage(languageCode: String) {
    Stonly.setWidgetLanguage(languageCode)
  }

  //WIDGET

  @ReactMethod
  fun sendData(data: Any) {
    Stonly.sendData(data)
  }

  @ReactMethod
  fun clearSentData() {
    Stonly.clearSentData()
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

    fun register(intent: Intent) {
      Stonly.register(intent)
    }
  }
}
