import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-remote-command-center' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RemoteCommandCenterModule = isTurboModuleEnabled
  ? require('./NativeRemoteCommandCenter').default
  : NativeModules.RemoteCommandCenter;

const RemoteCommandCenter = RemoteCommandCenterModule
  ? RemoteCommandCenterModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

const eventEmitter = new NativeEventEmitter(RemoteCommandCenter);

export function setEventListener(callback: (event: object) => void): Promise<void> {
  eventEmitter.addListener('RemoteCommandEvent', callback);
  return RemoteCommandCenter.setEventListener();
}

export function destroy(): Promise<void> {
  return RemoteCommandCenter.destroy();
}