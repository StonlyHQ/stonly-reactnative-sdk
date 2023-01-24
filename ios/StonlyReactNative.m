#import <React/RCTBridgeModule.h>
@import Stonly;
@interface RCT_EXTERN_MODULE(StonlyReactNative, NSObject)

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXTERN_METHOD(onScreenChanged:(NSString*)screenName tabIndex:(int)tabIndex)

RCT_EXPORT_METHOD(openGuidedTour:(NSString*)guideId stepId:(NSString*)stepId)
{
  [StonlyWidget openGuidedTour:guideId stepId:stepId window:nil];
}

RCT_EXPORT_METHOD(identify:(NSString*)customerId properties:(NSDictionary*)properties)
{
  [StonlyWidget identify:customerId properties:properties];
}

RCT_EXPORT_METHOD(track:(NSString*)eventName)
{
  [StonlyWidget track:eventName];
}

@end
