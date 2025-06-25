package com.stonlyreactnative

import android.app.Application
import android.content.Context
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.stonly.stonly.Stonly

class StonlyReactNativeModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun onScreenChanged(screenName: String) {
    Stonly.onScreenChanged(screenName)
  }

  // CONFIGURATION

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

  // WIDGET

  @ReactMethod
  fun sendData(data: Any) {
    Stonly.sendData(data)
  }

  @ReactMethod
  fun clearSentData() {
    Stonly.clearSentData()
  }

  @ReactMethod
  fun setWindowLevel(windowLever: Int) {
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

  @ReactMethod
  fun setStonlyEnabled(enabled: Boolean) {
    Stonly.setStonlyEnabled(enabled)
  }
  @ReactMethod
  fun setWidgetId(key: String) {
    Stonly.setWidgetId(key, this.reactApplicationContext.applicationContext as Application)
    // Save to SharedPreferences for persistence
    saveWidgetIdToPreferences(key, this.reactApplicationContext)
    Log.d(NAME, "Widget ID set to: $key")
  }

  @ReactMethod
  fun getWidgetId(promise: Promise) {
    try {
      // Try to get actual widget ID from Stonly SDK
      // Note: This might need to be adjusted based on actual Stonly Android SDK API
      val widgetId = Stonly.getWidgetId() ?: "NOT_DEFINED"
      Log.d(NAME, "Retrieved widget ID: $widgetId")
      promise.resolve(widgetId)
    } catch (e: Exception) {
      Log.e(NAME, "Failed to get widget ID", e)
      promise.reject("GET_WIDGET_ID_ERROR", "Failed to get widget ID: ${e.message}", e)
    }
  }
  @ReactMethod
  fun setAuthorizedDomains(domains: ReadableArray) {
    try {
      val domainsList = mutableListOf<String>()
      for (i in 0 until domains.size()) {
        domains.getString(i)?.let { domain -> domainsList.add(domain) }
      }
      Log.d(NAME, "setting authorized domains: $domainsList")
      Stonly.authorizedDomains(domainsList)
    } catch (e: Exception) {
      Log.e(NAME, "Failed to set authorized domains", e)
    }
  }

  private fun saveWidgetIdToPreferences(widgetId: String, context: Context) {
    try {
      val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
      prefs.edit().putString(WIDGET_ID_KEY, widgetId).apply()
      Log.d(NAME, "Widget ID saved to SharedPreferences: $widgetId")
    } catch (e: Exception) {
      Log.e(NAME, "Failed to save widget ID to SharedPreferences", e)
    }
  }

  companion object {
    const val NAME = "StonlyReactNative"
    private const val PREFS_NAME = "stonly_prefs"
    private const val WIDGET_ID_KEY = "stonly_widget_id"

    fun setWidgetId(key: String, application: Application) {
      Stonly.setWidgetId(key, application)
      Log.d(NAME, "Widget ID set to: $key")
    }

    fun setWidgetIdFromStorage(application: Application): Boolean {
      try {
        val prefs = application.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val storedWidgetId = prefs.getString(WIDGET_ID_KEY, null)
        if (storedWidgetId != null) {
          Stonly.setWidgetId(storedWidgetId, application)
          Log.d(NAME, "Widget ID restored from SharedPreferences: $storedWidgetId")
          return true
        } else {

          Log.d(NAME, "No stored widget ID found in SharedPreferences")
          return false
        }
      } catch (e: Exception) {
        Log.e(NAME, "Failed to restore widget ID from SharedPreferences", e)
        return false
      }
    }

    fun register(intent: Intent) {
      Stonly.register(intent)
    }
  }
}
