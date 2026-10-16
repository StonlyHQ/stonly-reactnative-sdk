package com.stonlyreactnative

import android.app.Activity
import android.app.Application
import android.content.Context
import android.content.Intent
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.stonly.stonly.Stonly
import com.stonly.stonly.StonlyDatacenter
import com.stonly.stonly.StonlyWidgetPlacement
import java.lang.Integer.parseInt

class StonlyReactNativeModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

  fun getContext(): Context? {
    return reactApplicationContext.baseContext
  }
  fun getActivity(): Activity? {
    // RN 0.85 removed the inherited currentActivity property from
    // ReactContextBaseJavaModule; read it from the react context instead.
    return reactApplicationContext.currentActivity
  }
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
  fun setSentryEnabled(enabled: Boolean) {
    Stonly.setSentryEnabled(enabled)
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
  fun sendData(data: ReadableMap) {
    // TurboModule interop cannot parse java.lang.Object parameters, so the
    // payload arrives as a ReadableMap and is converted before reaching the SDK.
    Stonly.sendData(readableMapToHashMap(data))
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
  fun openGuide(guideId: String, stepId: String?, widgetOptions: ReadableMap?) {
    Log.d(NAME, "open Guide with {$guideId} {$stepId}")
    var _stepId: Int? = null
    if (stepId != null) {
      try {
        _stepId = parseInt(stepId)
      } catch (ex: NumberFormatException) {
        Log.w(NAME, "stepId need to be a number or null")
      }
    }
    // Same keys as the iOS bridge: widgetOptions.widgetPlacement = SHEET|DIALOG|POPOVER|FULL_SCREEN
    val placement =
            when (widgetOptions?.takeIf { it.hasKey("widgetPlacement") }?.getString("widgetPlacement")) {
              "SHEET" -> StonlyWidgetPlacement.SHEET
              "DIALOG" -> StonlyWidgetPlacement.DIALOG
              "POPOVER" -> StonlyWidgetPlacement.POPOVER
              "FULL_SCREEN" -> StonlyWidgetPlacement.FULL_SCREEN
              else -> null
            }
    getActivity()?.let { activity ->
      activity.runOnUiThread {
        if (placement != null) {
          Stonly.openGuide(guideId, _stepId, placement, activity)
        } else {
          Stonly.openGuide(guideId, _stepId, activity)
        }
      }
    }
  }

  @ReactMethod
  fun openGuidedTour(guideId: String, stepId: String?) {
    Log.d(NAME, "open  GuidedTour with {$guideId} {$stepId}")
    var _stepId: Int? = null
    if (stepId != null) {
      try {
        _stepId = parseInt(stepId)
      } catch (ex: NumberFormatException) {
        Log.w(NAME, "stepId need to be a number or null")
      }
    }
    getActivity()?.let { activity ->
      activity.runOnUiThread { Stonly.openGuidedTour(guideId, _stepId, activity) }
    }
  }

  @ReactMethod
  fun openKnowledgeBase(teamKnowledgeBaseId: String, folderId: String?) {
    var _folderId: Int? = null
    if (folderId != null) {
      try {
        _folderId = parseInt(folderId)
      } catch (ex: NumberFormatException) {
        Log.w(NAME, "folderId need to be a number or null")
      }
    }
    getActivity()?.let { activity ->
      activity.runOnUiThread { Stonly.openKnowledgeBase(teamKnowledgeBaseId, _folderId, activity) }
    }
  }

  @ReactMethod
  fun closeWidget(widgetRuleId: String) {
    Stonly.closeWidget()
  }

  @ReactMethod
  fun identify(customerId: String, properties: ReadableMap) {
    val propertiesMap = readableMapToHashMap(properties)
    Stonly.tracker?.identify(customerId, propertiesMap)
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
  fun setWidgetId(key: String, datacenter: String?) {
    val resolvedDatacenter = StonlyDatacenter.fromValue(datacenter)
    val application = this.reactApplicationContext.applicationContext as Application
    // Stonly.setWidgetId tears down trigger views (clearActivity -> removeAllViews),
    // so it must run on the main thread — @ReactMethod runs on mqt_v_native.
    Handler(Looper.getMainLooper()).post {
      Stonly.setWidgetId(key, application, datacenter = resolvedDatacenter)
    }
    // Save to SharedPreferences for persistence
    saveWidgetIdToPreferences(key, resolvedDatacenter, this.reactApplicationContext)
    Log.d(NAME, "Widget ID set to: $key (datacenter: ${resolvedDatacenter.name})")
  }

  @ReactMethod
  fun getWidgetId(promise: Promise) {
    try {
      // Try to get actual widget ID from Stonly SDK
      // Note: This might need to be adjusted based on actual Stonly Android SDK API
      val widgetId = Stonly.getWidgetId()
      val result = if (widgetId.isNullOrEmpty()) "NOT_DEFINED" else widgetId
      Log.d(NAME, "Retrieved widget ID: $result")
      promise.resolve(result)
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

  private fun saveWidgetIdToPreferences(
          widgetId: String,
          datacenter: StonlyDatacenter,
          context: Context
  ) {
    try {
      val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
      prefs.edit()
              .putString(WIDGET_ID_KEY, widgetId)
              .putString(DATACENTER_KEY, datacenter.name.lowercase())
              .apply()
      Log.d(NAME, "Widget ID saved to SharedPreferences: $widgetId")
    } catch (e: Exception) {
      Log.e(NAME, "Failed to save widget ID to SharedPreferences", e)
    }
  }

  private fun readableMapToHashMap(readableMap: ReadableMap): HashMap<String, Any> {
    val hashMap = HashMap<String, Any>()
    val iterator = readableMap.keySetIterator()

    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      val value =
              when (readableMap.getType(key)) {
                ReadableType.Null -> null
                ReadableType.Boolean -> readableMap.getBoolean(key)
                ReadableType.Number -> readableMap.getDouble(key)
                ReadableType.String -> readableMap.getString(key)
                ReadableType.Map -> {
                  val map = readableMap.getMap(key)
                  if (map != null) readableMapToHashMap(map) else HashMap<String, Any>()
                }
                ReadableType.Array -> {
                  val array = readableMap.getArray(key)
                  if (array != null) readableArrayToList(array) else emptyList<Any>()
                }
              }
      if (value != null) {
        hashMap[key] = value
      }
    }
    return hashMap
  }

  private fun readableArrayToList(readableArray: ReadableArray): List<Any> {
    val list = mutableListOf<Any>()
    for (i in 0 until readableArray.size()) {
      val value =
              when (readableArray.getType(i)) {
                ReadableType.Null -> null
                ReadableType.Boolean -> readableArray.getBoolean(i)
                ReadableType.Number -> readableArray.getDouble(i)
                ReadableType.String -> readableArray.getString(i)
                ReadableType.Map -> {
                  val map = readableArray.getMap(i)
                  if (map != null) readableMapToHashMap(map) else HashMap<String, Any>()
                }
                ReadableType.Array -> {
                  val array = readableArray.getArray(i)
                  if (array != null) readableArrayToList(array) else emptyList<Any>()
                }
              }
      if (value != null) {
        list.add(value)
      }
    }
    return list
  }

  companion object {
    const val NAME = "StonlyReactNative"
    private const val PREFS_NAME = "stonly_prefs"
    private const val WIDGET_ID_KEY = "stonly_widget_id"
    private const val DATACENTER_KEY = "stonly_datacenter"

    fun setWidgetId(key: String, application: Application, datacenter: String? = null) {
      Stonly.setWidgetId(key, application, datacenter = StonlyDatacenter.fromValue(datacenter))
      Log.d(NAME, "Widget ID set to: $key")
    }

    fun setWidgetIdFromStorage(application: Application): Boolean {
      try {
        val prefs = application.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val storedWidgetId = prefs.getString(WIDGET_ID_KEY, null)
        val storedDatacenter = prefs.getString(DATACENTER_KEY, null)
        if (storedWidgetId != null) {
          Stonly.setWidgetId(
                  storedWidgetId,
                  application,
                  datacenter = StonlyDatacenter.fromValue(storedDatacenter)
          )
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
