import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setEventListener(callback: (event: string) => void): Promise<void>;
  destroy(): Promise<void>
}

export default TurboModuleRegistry.getEnforcing<Spec>('RemoteCommandCenter');
