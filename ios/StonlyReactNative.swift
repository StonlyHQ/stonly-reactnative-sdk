import Stonly

@objc(StonlyReactNative)
class StonlyReactNative: NSObject {

  @objc(multiply:withB:withResolver:withRejecter:)
  func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
    print("Yooo")
    print(Stonly.Widget.widgetId)
  }

  @objc(onScreenChanged:withB:withResolver:withRejecter:)
  func onScreenChanged(a: String, b: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    print("Yooo")
    print(Stonly.Widget.widgetId)
  }
}
