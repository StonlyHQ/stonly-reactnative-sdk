import Stonly

@objc(StonlyReactNative)
class StonlyReactNative: NSObject {

  @objc(multiply:withB:withResolver:withRejecter:)
  func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
    print("Yooo")
    print(Stonly.Widget.widgetId)
  }

  @objc(onScreenChanged:tabIndex:)
  func onScreenChanged(screenName: String, tabIndex: Int) -> Void {
    print("onScreenChanged")
    print(Stonly.Widget.widgetId)
  }
}
