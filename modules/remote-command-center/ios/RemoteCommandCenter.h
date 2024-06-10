
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRemoteCommandCenterSpec.h"

@interface RemoteCommandCenter : NSObject <NativeRemoteCommandCenterSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RemoteCommandCenter : NSObject <RCTBridgeModule>
#endif

@end
