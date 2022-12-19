import Stonly

@objc(StonlyReactNative)
class StonlyReactNative: NSObject {
    
    @objc(onScreenChanged:tabIndex:)
    func onScreenChanged(screenName: String, tabIndex: Int) -> Void {
        print("onScreenChanged")
        Stonly.Widget.didChangeScreen(screenName, tabIndex: tabIndex)
    }
}
