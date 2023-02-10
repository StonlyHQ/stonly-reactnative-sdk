import Stonly

@objc(StonlyReactNative)
class StonlyReactNative: NSObject {
    
    @objc(onScreenChanged:)
    func onScreenChanged(screenName: String) -> Void {
        Stonly.Widget.didChangeScreen(screenName)
    }
}
