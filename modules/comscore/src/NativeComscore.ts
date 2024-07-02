import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { CommunicatingUserConsentValue, ComScoreParams, Data1p, ComscoreStreamingTagService } from './types';

export interface Spec extends TurboModule {
  initializeComScore(params: ComScoreParams): Promise<boolean>;
  updateConsent(consentValue: CommunicatingUserConsentValue): Promise<boolean>;
  trackScreen(pageName: string): Promise<boolean>;
  trackScreenWithData(pageName: string, additionalParams: Record<string, any>): Promise<boolean>;
  update1PData(params: Data1p): Promise<boolean>;
  createStreamingService(implementationDetails: any): Promise<ComscoreStreamingTagService>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Comscore');
