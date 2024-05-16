import { FullscreenHandler } from "bitmovin-player-react-native";
import { Platform, StatusBar } from "react-native";

// Define a handler to take care of fullscreen transitions
export class SampleFullscreenHandler implements FullscreenHandler {
    isFullscreenActive: boolean = true;
    onFullscreen: (fullscreenMode: boolean) => void;
  
    constructor(
      isFullscreenActive: boolean,
      onFullscreen: (fullscreenMode: boolean) => void
    ) {
      this.isFullscreenActive = isFullscreenActive;
      this.onFullscreen = onFullscreen;
    }
  
    enterFullscreen(): void {
      // Update UI state for fullscreen mode
      this.isFullscreenActive = true;
      this.onFullscreen(true);
      /*
      if (Platform.OS === 'android') {
        // Hides navigation and status bar on Android using 'react-native-system-navigation-bar' package
        SystemNavigationBar.stickyImmersive(true);
      } else {
        // Hides status bar on iOS
        StatusBar.setHidden(true);
      }*/
      StatusBar.setHidden(true);
      // If landscape mode during fullscreen is preferred
      // this should be handled here as well 
      // by integrating integrating 'react-native-orientation-locker' package
      // and uncommenting the next line:
      // Orientation.lockToLandscape();
      console.log('enter fullscreen');
    }
  
    exitFullscreen(): void {
      // Update UI state for non-fullscreen mode
      this.isFullscreenActive = false;
      this.onFullscreen(false);
      /*
      if (Platform.OS === 'android') {
        // shows navigation and status bar on Android using 'react-native-system-navigation-bar' package
        SystemNavigationBar.stickyImmersive(false);
      } else {
        // shows status bar on iOS
        StatusBar.setHidden(false);
      }*/
      StatusBar.setHidden(false);
      // If landscape mode during fullscreen is preferred
      // this should be handled here as well
      // by integrating integrating 'react-native-orientation-locker' package
      // and uncommenting the next line:
      // Orientation.unlockAllOrientations();
      console.log('exit fullscreen');
    }
  }
  