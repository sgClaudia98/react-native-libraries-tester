import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { CommunicatingUserConsentValue, ComScoreParams, Data1p } from './types';

export interface Spec extends TurboModule {
  initializeComScore(params: ComScoreParams): Promise<void>;
  updateConsent(consentValue: CommunicatingUserConsentValue): Promise<void>;
  trackScreen(pageName: string): Promise<void>;
  trackScreenWithData(pageName: string, additionalParams: Record<string, any>): Promise<void>;
  update1PData(params: Data1p): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Comscore');
