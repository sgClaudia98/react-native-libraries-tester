#import "MediaControls.h"
#import <React/RCTLog.h>
#import <React/RCTEventEmitter.h>
#import <MediaPlayer/MediaPlayer.h>

@implementation MediaControls

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onPlay", @"onPause", @"onGoBack", @"onGoForward"];
}

RCT_EXPORT_METHOD(initialize) {
  MPRemoteCommandCenter *commandCenter = [MPRemoteCommandCenter sharedCommandCenter];

  [commandCenter.playCommand addTarget:self action:@selector(onPlay)];
  [commandCenter.pauseCommand addTarget:self action:@selector(onPause)];
  [commandCenter.previousTrackCommand addTarget:self action:@selector(onGoBack)];
  [commandCenter.nextTrackCommand addTarget:self action:@selector(onGoForward)];
}

RCT_EXPORT_METHOD(updateNowPlaying:(NSDictionary *)nowPlayingInfo) {
  NSMutableDictionary *nowPlaying = [NSMutableDictionary dictionary];
  
  if (nowPlayingInfo[@"title"]) {
    nowPlaying[MPMediaItemPropertyTitle] = nowPlayingInfo[@"title"];
  }
  
  [MPNowPlayingInfoCenter defaultCenter].nowPlayingInfo = nowPlaying;
}

- (MPRemoteCommandHandlerStatus)onPlay {
  [self sendEventWithName:@"onPlay" body:nil];
  return MPRemoteCommandHandlerStatusSuccess;
}

- (MPRemoteCommandHandlerStatus)onPause {
  [self sendEventWithName:@"onPause" body:nil];
  return MPRemoteCommandHandlerStatusSuccess;
}

- (MPRemoteCommandHandlerStatus)onGoBack {
  [self sendEventWithName:@"onGoBack" body:nil];
  return MPRemoteCommandHandlerStatusSuccess;
}

- (MPRemoteCommandHandlerStatus)onGoForward {
  [self sendEventWithName:@"onGoForward" body:nil];
  return MPRemoteCommandHandlerStatusSuccess;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeMediaControlsSpecJSI>(params);
}
#endif

@end
