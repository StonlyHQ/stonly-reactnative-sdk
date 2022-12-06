#import <React/RCTBridgeModule.h>
@import Stonly;
@interface RCT_EXTERN_MODULE(StonlyReactNative, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXTERN_METHOD(onScreenChanged:(NSString *)screenName tabIndex:(int)tabIndex)

RCT_EXPORT_METHOD(openGuidedTour:(NSString*)guideId stepId:(NSString*)stepId)
{
  [StonlyWidget openGuidedTour:guideId stepId:stepId window:nil];
}

@end
