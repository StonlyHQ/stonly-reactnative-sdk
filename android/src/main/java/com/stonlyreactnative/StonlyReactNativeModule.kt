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
  fun multiply(a: Double, b: Double, promise: Promise) {
    Log.d("StonlyMonitoring", "Yoooo2!")
    promise.resolve(a * b)
  }

  companion object {
    const val NAME = "StonlyReactNative"

    fun setWidgetId(key: String, application: Application) {
      Stonly.setWidgetId(key, application)
    }
  }
}