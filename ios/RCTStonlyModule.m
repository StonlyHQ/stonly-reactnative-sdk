//
//  RCTStonlyModule.m
//  RNClient
//
//  Created by Amadour Griffais on 18/05/2022.
//

#import "RCTStonlyModule.h"

#import <React/RCTBridge.h>

@import Stonly;

@interface RCTStonlyModule() <StonlyWidgetDelegate>
@end

@implementation RCTStonlyModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(StonlyWidget);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(setWidgetId:(NSString *)widgetId)
{
  StonlyWidget.widgetId = widgetId;
}

RCT_EXPORT_METHOD(getWidgetIdAsync:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *widgetId = StonlyWidget.widgetId;
  if (widgetId) {
    resolve(widgetId);
  } else {
    resolve(@"");
  }
}

RCT_EXPORT_METHOD(setDebugEnabled:(BOOL)debugEnabled)
{
  StonlyWidget.debugEnabled = debugEnabled;
}

RCT_EXPORT_METHOD(setMonitoringEnabled:(BOOL)monitoringEnabled)
{
  StonlyWidget.monitoringEnabled = monitoringEnabled;
}

RCT_EXPORT_METHOD(setSegmentAnonymousId:(NSString *)segmentAnonymousId)
{
  [StonlyWidget setSegmentAnonymousId:segmentAnonymousId];
}

RCT_EXPORT_METHOD(sendData:(NSDictionary*)data)
{
  [StonlyWidget sendData:data];
}

RCT_EXPORT_METHOD(clearSentData)
{
  [StonlyWidget clearSentData];
}

RCT_EXPORT_METHOD(setWidgetLanguage:(NSString*)languageCode)
{
  [StonlyWidget setWidgetLanguage:languageCode];
}

RCT_EXPORT_METHOD(setWindowLevel:(NSNumber*)windowLevel)
{
  [StonlyWidget setWindowLevel:windowLevel.doubleValue];
}

RCT_EXPORT_METHOD(openGuide:(NSString*)guideId stepId:(NSString*)stepId widgetOptions:(NSDictionary*)widgetOptions)
{
  StonlyWidgetPlacement placement = StonlyWidgetPlacementSheet;
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

  [StonlyWidget openGuide:guideId stepId:stepId widgetOptions:options window:nil];
}

RCT_EXPORT_METHOD(openGuidedTour:(NSString*)guideId stepId:(NSString*)stepId)
{
  [StonlyWidget openGuidedTour:guideId stepId:stepId window:nil];
}

RCT_EXPORT_METHOD(openKnowledgeBase:(NSString*)teamKnowledgeBaseId folderId:(NSString*)folderId)
{
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
 
 

RCT_EXPORT_METHOD(handleURL:(NSString*)urlString)
{
  NSURL* url = [NSURL URLWithString:urlString];
  if (!url) {
    return;
  }

  //Cast to void to ignore result
  (void)[StonlyWidget handleURL:url];
}

//Delegate
-(NSArray<NSString *> *)supportedEvents {
  return @[@"widgetDidSendEvent",
           @"widgetDidFailLoading",
           @"widgetWillOpen",
           @"widgetDidClose"];
}

- (void)startObserving {
  StonlyWidget.delegate = self;
}

- (void)stopObserving {
  StonlyWidget.delegate = nil; }

-(void)stonlyWidgetDidSendEvent:(id)event {
  [self sendEventWithName:@"widgetDidSendEvent" body:event];
}

-(void)stonlyWidgetDidFailLoadingWithError:(NSError *)error {
  [self sendEventWithName:@"widgetDidFailLoading" body:@{@"errorDescription": error.localizedDescription}];
}

- (void)stonlyWidgetWillOpenWithWidgetRuleId:(NSString *)widgetRuleId window:(UIWindow *)window {
  [self sendEventWithName:@"widgetWillOpen" body:@{@"widgetRuleId": widgetRuleId}];
}

- (void)stonlyWidgetDidCloseWithWidgetRuleId:(NSString *)widgetRuleId window:(UIWindow *)window {
  [self sendEventWithName:@"widgetDidClose" body:@{@"widgetRuleId": widgetRuleId}];
}

@end
