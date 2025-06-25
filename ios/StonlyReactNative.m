#import <React/RCTBridgeModule.h>
@import Stonly;
@interface RCT_EXTERN_MODULE(StonlyReactNative, NSObject)

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXTERN_METHOD(onScreenChanged:(NSString*)screenName)

RCT_EXPORT_METHOD(openGuidedTour:(NSString*)guideId stepId:(NSString*)stepId)
{
  [StonlyWidget openGuidedTour:guideId stepId:stepId window:nil];
}

RCT_EXPORT_METHOD(identify:(NSString*)customerId properties:(NSDictionary*)properties)
{
  [StonlyWidget identify:customerId properties:properties darkMode:false];
}

RCT_EXPORT_METHOD(track:(NSString*)eventName)
{
  [StonlyWidget track:eventName];
}

RCT_EXPORT_METHOD(setStonlyEnabled:(BOOL)enabled)
{
  [StonlyWidget setStonlyEnabled:enabled];
}

RCT_EXPORT_METHOD(setWidgetId:(NSString*)widgetId)
{
  [StonlyWidget setWidgetId:widgetId];
}
RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getWidgetId)
{
  return [StonlyWidget widgetId];
}

RCT_EXPORT_METHOD(setAuthorizedDomains:(NSArray<NSString *>*)domains)
{
  [StonlyWidget authorizedDomains:domains];
}
 
@end
