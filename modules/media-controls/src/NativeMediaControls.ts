import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  initialize(): void;
  updateNowPlaying(title: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MediaControls');
