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

  NSString* stepIdString = @"";
  if([stepId isEqualToString:@""]) {
    stepIdString = nil;
  }else{
    stepIdString = stepId;
  }
  [StonlyWidget openGuidedTour:guideId stepId:stepIdString window:nil];
}

RCT_EXPORT_METHOD(openGuide:(NSString*)guideId stepId:(NSString*)stepId widgetOptions:(NSDictionary*)widgetOptions)
{
   StonlyWidgetPlacement placement = StonlyWidgetPlacementSheet;
   placement = StonlyWidgetPlacementFullscreen;
  NSString* placementString = widgetOptions[@"widgetPlacement"];
  if ([placementString isEqualToString:@"SHEET"]) {
    placement = StonlyWidgetPlacementSheet;
  }
  if ([placementString isEqualToString:@"DIALOG"]) {
    placement = StonlyWidgetPlacementDialog;
  }
  if ([placementString isEqualToString:@"POPOVER"]) {
    placement = StonlyWidgetPlacementPopover;
  }
  if ([placementString isEqualToString:@"FULL_SCREEN"]) {
    placement = StonlyWidgetPlacementFullscreen;
  }

  StonlyWidgetOptions* options = StonlyWidgetOptions.new;
  options.placement = placement;
  NSString* stepIdString = @"";
  if([stepId isEqualToString:@""]) {
    stepIdString = nil;
  }else{
    stepIdString = stepId;
  }
  [StonlyWidget openGuide:guideId stepId:stepIdString widgetOptions:options window:nil];
}

RCT_EXPORT_METHOD(openKnowledgeBase:(NSString*)teamKnowledgeBaseId folderId:(NSString*)folderId)
{
  NSString* folderIdString = @"";
  if([folderId isEqualToString:@""]) {
    folderIdString = nil;
  }else{
    folderIdString = folderId;
  }
  [StonlyWidget openKnowledgeBase:teamKnowledgeBaseId folderId:folderId window:nil];
}

RCT_EXPORT_METHOD(closeWidget:(NSString*)widgetRuleId)
{
  [StonlyWidget closeWidget:widgetRuleId window:nil];
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
