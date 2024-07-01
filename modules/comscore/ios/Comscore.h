
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNComscoreSpec.h"

@interface Comscore : NSObject <NativeComscoreSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Comscore : NSObject <RCTBridgeModule>
#endif

@end
