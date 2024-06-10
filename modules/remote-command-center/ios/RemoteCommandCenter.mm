#import "RemoteCommandCenter.h"
#import <MediaPlayer/MediaPlayer.h>

@implementation RemoteCommandCenter

RCT_EXPORT_MODULE();

RCTResponseSenderBlock _callback;

RCT_EXPORT_METHOD(setEventListener:(RCTResponseSenderBlock)callback resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    _callback = callback;
    [self setupRemoteCommandCenter];
    resolve(nil);
}

RCT_EXPORT_METHOD(destroy) {
    [self stopObserving];
    _callback = nil;
}

- (void)setupRemoteCommandCenter {
    MPRemoteCommandCenter *commandCenter = [MPRemoteCommandCenter sharedCommandCenter];

    [commandCenter.playCommand addTarget:self action:@selector(playCommandAction:)];
    [commandCenter.pauseCommand addTarget:self action:@selector(pauseCommandAction:)];
    [commandCenter.nextTrackCommand addTarget:self action:@selector(nextTrackCommandAction:)];
    [commandCenter.previousTrackCommand addTarget:self action:@selector(previousTrackCommandAction:)];
}

- (MPRemoteCommandHandlerStatus)playCommandAction:(MPRemoteCommandEvent *)event {
    if (_callback) {
        _callback(@[@"play"]);
    }
    return MPRemoteCommandHandlerStatusSuccess;
}

- (MPRemoteCommandHandlerStatus)pauseCommandAction:(MPRemoteCommandEvent *)event {
    if (_callback) {
        _callback(@[@"pause"]);
    }
    return MPRemoteCommandHandlerStatusSuccess;
}

- (MPRemoteCommandHandlerStatus)nextTrackCommandAction:(MPRemoteCommandEvent *)event {
    if (_callback) {
        _callback(@[@"nextTrack"]);
    }
    return MPRemoteCommandHandlerStatusSuccess;
}

- (MPRemoteCommandHandlerStatus)previousTrackCommandAction:(MPRemoteCommandEvent *)event {
    if (_callback) {
        _callback(@[@"previousTrack"]);
    }
    return MPRemoteCommandHandlerStatusSuccess;
}

@end
