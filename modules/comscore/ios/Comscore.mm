#import "Comscore.h"
#import <ComScore/ComScore.h>
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <React/RCTBridgeMethod.h>

@implementation Comscore
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initializeComScore:(NSDictionary *)params) {
    NSString *_publisherId = params[@"publisherId"];
    if (!_publisherId) {
        RCTLogError(@"Comscore - Error: publisherId is missing.");
        return;
    }
    RCTLog(@"Comscore - Setting publisherId: %@", _publisherId);

    // Optional parameters
    NSString *applicationName = params[@"applicationName"];
    NSString *usagePropertiesAutoUpdateMode = params[@"usagePropertiesAutoUpdateMode"];
    NSNumber *usagePropertiesAutoUpdateInterval = params[@"usagePropertiesAutoUpdateInterval"];

    RCTLog(@"Comscore - Initializing ComScore");

    NSMutableDictionary *labels = [NSMutableDictionary dictionary];
    NSDictionary *data1p = params[@"data_1p"];
    if (data1p) {
        RCTLog(@"Comscore - Data_1p is not nil");
        labels[@"cs_fpid"] = data1p[@"cs_fpid"];
        labels[@"cs_fpit"] = data1p[@"cs_fpit"];
        labels[@"cs_fpdm"] = data1p[@"cs_fpdm"];
        labels[@"cs_fpdt"] = data1p[@"cs_fpdt"];
        labels[@"cs_ucfr"] = data1p[@"cs_ucfr"]; // User Consent
    }

    @try {
        SCORPublisherConfiguration *publisherConfig;
        publisherConfig = [SCORPublisherConfiguration publisherConfigurationWithBuilderBlock:^(SCORPublisherConfigurationBuilder *builder) {
            builder.publisherId = _publisherId;
            if (labels.count > 0) {
                builder.persistentLabels = labels;
            }
        }];

        if (applicationName && applicationName.length > 0) {
            RCTLog(@"Comscore - Setting applicationName: %@", applicationName);
            [SCORAnalytics configuration].applicationName = applicationName;
        }

        if (usagePropertiesAutoUpdateMode && usagePropertiesAutoUpdateMode.length > 0) {
            SCORUsagePropertiesAutoUpdateMode autoUpdateMode = [self parseUpdateMode:usagePropertiesAutoUpdateMode];
            RCTLog(@"Comscore - Setting usagePropertiesAutoUpdateMode: %ld", (long)autoUpdateMode);
            [SCORAnalytics configuration].usagePropertiesAutoUpdateMode = autoUpdateMode;
        }

        if (usagePropertiesAutoUpdateInterval && [usagePropertiesAutoUpdateInterval integerValue] > 0) {
            RCTLog(@"Comscore - Setting usagePropertiesAutoUpdateInterval: %@", usagePropertiesAutoUpdateInterval);
            [SCORAnalytics configuration].usagePropertiesAutoUpdateInterval = [usagePropertiesAutoUpdateInterval integerValue];
        }

        [[SCORAnalytics configuration] addClientWithConfiguration:publisherConfig];
        [SCORAnalytics.configuration enableImplementationValidationMode];
        [SCORAnalytics start];
    }
    @catch (NSException *exception) {
        RCTLogError(@"Comscore - Error initializing ComScore: %@", exception.reason);
    }
}

RCT_EXPORT_METHOD(updateConsent:(NSString *)consentValue) {
    if (!_publisherId) {
        RCTLogError(@"Comscore - Error: publisherId is missing.");
        return;
    }
    RCTLog(@"Comscore - updateConsent: %@", consentValue);
    @try {
        [((SCORClientConfiguration *) [[SCORAnalytics configuration] publisherConfigurationWithPublisherId:_publisherId]) setPersistentLabelWithName:@"cs_ucfr" value:consentValue];
        [SCORAnalytics notifyHiddenEvent];
    }
    @catch (NSException *exception) {
        RCTLogError(@"Comscore - Error in updateConsent: %@", exception.reason);
    }
}

RCT_EXPORT_METHOD(trackScreen:(NSString *)pageName) {
    if (!pageName) {
        RCTLogError(@"Comscore - trackScreen: pageName is nil.");
        return;
    }
    RCTLog(@"Comscore - trackScreen page name: %@", pageName);
    @try {
        [SCORAnalytics notifyViewEventWithLabels:@{@"ns_category": pageName}];
        RCTLog(@"Comscore - notifyViewEvent called successfully.");
    }
    @catch (NSException *exception) {
        RCTLogError(@"Comscore - Error in trackScreen: %@", exception.reason);
    }
}

RCT_EXPORT_METHOD(trackScreenWithData:(NSString *)pageName data:(NSDictionary *)additionalParams) {
    if (!pageName) {
        RCTLogError(@"Comscore - trackScreen: pageName is nil.");
        return;
    }
    RCTLog(@"Comscore - trackScreen page name: %@", pageName);
    @try {
        NSMutableDictionary<NSString *, NSString *> *params = [NSMutableDictionary dictionaryWithDictionary:@{@"ns_category": pageName}];
        if (additionalParams) {
            [params addEntriesFromDictionary:additionalParams];
        }
        
        [SCORAnalytics notifyViewEventWithLabels:params];
        RCTLog(@"Comscore - notifyViewEvent called successfully.");
    }
    @catch (NSException *exception) {
        RCTLogError(@"Comscore - Error in trackScreen: %@", exception.reason);
    }
}

RCT_EXPORT_METHOD(update1PData:(NSDictionary *)params) {
    NSString *_publisherId = params[@"publisherId"];
    if (!_publisherId) {
        RCTLogError(@"Comscore - Error: publisherId is missing.");
        return;
    }

    @try {
        for (NSString *key in params.allKeys) {
            if (![key isEqualToString:@"publisherId"]) {
                [((SCORClientConfiguration *) [[SCORAnalytics configuration] publisherConfigurationWithPublisherId:_publisherId]) setPersistentLabelWithName:key value:params[key]];
                RCTLog(@"Comscore - Setting persistent label: %@ - %@", key, params[key]);
            }
        }
        [SCORAnalytics notifyHiddenEvent];
        RCTLog(@"Comscore - 1p data updated.");
    }
    @catch (NSException *exception) {
        RCTLogError(@"Comscore - Error updating 1P data: %@", exception.reason);
    }
}

- (SCORUsagePropertiesAutoUpdateMode)parseUpdateMode:(NSString *)modeString {
    if ([modeString isEqualToString:@"FOREGROUND_ONLY"]) {
        return SCORUsagePropertiesAutoUpdateModeForegroundOnly;
    } else if ([modeString isEqualToString:@"FOREGROUND_AND_BACKGROUND"]) {
        return SCORUsagePropertiesAutoUpdateModeForegroundAndBackground;
    } else if ([modeString isEqualToString:@"DISABLED"]) {
        return SCORUsagePropertiesAutoUpdateModeDisabled;
    } else {
        return SCORUsagePropertiesAutoUpdateModeForegroundOnly; // Default value
    }
}

@end
