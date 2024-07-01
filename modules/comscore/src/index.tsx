import { NativeModules, Platform } from 'react-native';
import { CommunicatingUserConsentValue, ComScoreParams, Data1p } from './types';

const LINKING_ERROR =
  `The package 'react-native-comscore' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ComscoreModule = isTurboModuleEnabled
  ? require('./NativeComscore').default
  : NativeModules.Comscore;

const Comscore = ComscoreModule
  ? ComscoreModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export function initializeComScore(params: ComScoreParams): Promise<void> {
  try {
    const comScoreParams: Partial<ComScoreParams> = {
      publisherId: params.publisherId,
    };

    if (params.applicationName !== undefined) {
      comScoreParams.applicationName = params.applicationName;
    }

    if (params.usagePropertiesAutoUpdateMode !== undefined) {
      comScoreParams.usagePropertiesAutoUpdateMode =
        params.usagePropertiesAutoUpdateMode;
    }

    if (params.usagePropertiesAutoUpdateInterval !== undefined) {
      comScoreParams.usagePropertiesAutoUpdateInterval =
        params.usagePropertiesAutoUpdateInterval;
    }

    if (params.data_1p !== undefined) {
      comScoreParams.data_1p = params.data_1p;
    }

    console.log('comScoreInitialized');
    return Comscore.initializeComScore(comScoreParams);

  } catch (e) {
    console.log('Error in initializing comscore', e);
    throw e
  }
}

export function updateConsent(consentValue: CommunicatingUserConsentValue): Promise<void> {
  try {
    return Comscore.updateConsent(consentValue);
  } catch (e) {
    console.log('Error in updateConsent', e);
    throw e
  }
}

export function trackScreen(pageName: string): Promise<void> {
  try {
    if (pageName === undefined) return Promise.resolve();
    return Comscore.trackScreen(pageName);
  } catch (e) {
    console.log('error in trackScreen : ', e);
    throw e
  }
}

export function trackScreenWithData(pageName: string, additionalParams: Record<string, any>): Promise<void> {
  try {
    if (pageName === undefined) return Promise.resolve();
    return Comscore.trackScreenWithData(pageName, additionalParams);
  } catch (e) {
    console.log('error in trackScreen : ', e);
    throw e
  }
}

export function update1PData(params: Data1p): Promise<void> {
  try {
    let updatedData1p: Partial<Data1p> = {};
    if (params.publisherId !== undefined) {
      updatedData1p.publisherId = params.publisherId;
    } else {
      console.error('PublisherId is required!');
      throw new Error('PublisherId is required!')
    }

    if (params.cs_fpid !== undefined) {
      updatedData1p.cs_fpid = params.cs_fpid;
    }

    if (params.cs_fpdm !== undefined) {
      updatedData1p.cs_fpdm = params.cs_fpdm;
    }

    if (params.cs_fpit !== undefined) {
      updatedData1p.cs_fpit = params.cs_fpit;
    }

    if (params.cs_fpdt !== undefined) {
      updatedData1p.cs_fpdt = params.cs_fpdt;
    }

    return Comscore.update1PData(updatedData1p);
  } catch (e) {
    console.log('Error in updateConsent', e);
    throw e;
  }
}