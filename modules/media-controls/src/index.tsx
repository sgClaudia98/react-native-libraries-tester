import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-media-controls' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const MediaControlsModule = isTurboModuleEnabled
  ? require('./NativeMediaControls').default
  : NativeModules.MediaControls;

const MediaControls = MediaControlsModule
  ? MediaControlsModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function initialize(): void {
  MediaControls.initialize();
}

export function updateNowPlaying(title: string): void {
  MediaControls.updateNowPlaying(title);
}
