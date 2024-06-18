
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNMediaControlsSpec.h"

@interface MediaControls : NSObject <NativeMediaControlsSpec>
#else
#import <React/RCTBridgeModule.h>

@interface MediaControls : NSObject <RCTBridgeModule>
#endif

@end
