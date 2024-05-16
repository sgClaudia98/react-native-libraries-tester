import React, {useEffect, useCallback, useState, useRef} from 'react';
import {View, Platform, StyleSheet, Button, FlatList, FlatListComponent, Text, ListRenderItem} from 'react-native';
import {
  usePlayer,
  SourceType,
  PlayerView,
  AudioSession,
  AdSourceType,
  PlayerViewConfig,
} from 'bitmovin-player-react-native';
import { mockApiMedia } from '../data/MockApiMedia';
import { getAdItems, getSourceConfig } from '../utils/media';
import { SampleFullscreenHandler } from '../handlers/SampleFullscreenHandler';

export default function PlayerSample() {


  // State to reflect current fullscreen state.
  const [fullscreenMode, setFullscreenMode] = useState(false);
  
  const MOCK = mockApiMedia;
  const player = usePlayer({
    // The only required parameter is the license key but it can be omitted from code upon correct
    // Info.plist/AndroidManifest.xml configuration.
    //
    // Head to `Configuring your License` for more information.
    licenseKey: '9a30c8cf-d987-4234-91f8-095eaf66cf56',
    
  });

  useEffect(() => {
    console.log("Player set")
    // iOS audio session category must be set to `playback` first, otherwise playback
    // will have no audio when the device is silenced.
    //
    // Usually it's desireable to set the audio's category only once during your app's main component
    // initialization. This way you can guarantee that your app's audio category is properly
    // configured throughout the whole lifecycle of the application.
    AudioSession.setCategory('playback').catch((error: any) => {
      // Handle any native errors that might occur while setting the audio's category.
      console.log("Failed to set app's audio category to `playback`:\n", error);
    });

    // Source
    player.load(getSourceConfig(MOCK));
    console.log("Player load config ")

    // Advertising
    getAdItems(MOCK.publicitat).forEach(element => {
      player.scheduleAd(element)
      console.log("Player scheduleAd -> " + element.position)
    });

  }, [player]);

  // onReady is called when the player has downloaded initial
  // video and audio and is ready to start playback.
  const onReady = useCallback(
    (event: any) => {
      // Start playback
      console.log("onReady -> Play")
      player.play();
    },
    [player],
  );

  useEffect(() => {
    if (player.isInitialized) {
      console.log("isInitialized -> " + player.isInitialized)
      player.isPlaying().then(val => {
        if (!val) {
          // player.play()
        }
      });
    }
  }, [player.isInitialized]);

  const playerViewConfig: PlayerViewConfig = {
    pictureInPictureConfig: {
      isEnabled: true,
    },
  };

  const fullscreenHandler = useRef(
    new SampleFullscreenHandler(fullscreenMode, (isFullscreen: boolean) => {
      setFullscreenMode(isFullscreen);
      console.log("Full", isFullscreen)
      /*
      // In case of native stack navigation show/hide top bar with showing/hiding home indicator on iOS
      navigation.setOptions({
        headerShown: !isFullscreen, // show/hide top bar
        autoHideHomeIndicator: isFullscreen, // show/hide home indicator on iOS
      });

      // In case of bottom tabs navigation show/hide top and bottom bars
      navigation.setOptions({
        headerShown: !isFullscreen, // show/hide top bar
        tabBarStyle: {display: isFullscreen ? 'none' : 'flex'}, // show/hide bottom bar
        autoHideHomeIndicator: isFullscreen, // show/hide home indicator on iOS
      });
      */
    }),
  ).current;


  return (
    <View style={styles.flex1}>
      <PlayerView
        onPlayerError={() => console.log("onPlayerError -> ")}
        onAdError={e => console.log("onAdError -> ")}
        onSourceError={() => console.log("onSourceError -> ")}
        onPaused={() => console.log("onPause -> ")}
        onPlay={() => console.log("onPlay -> ")}
        config={playerViewConfig}
        style={fullscreenMode ? styles.playerFullscreen : styles.flex1}
/*      
        onAdBreakStarted={() => console.log('ad break started')}
        onAdBreakFinished={() => console.log('ad break finish')}
        onAdScheduled={() => console.log('ad scheduled')}
        onAdFinished={() => console.log('ad finish')}
        onAdClicked={()=> console.log('ad clicked') }
        onAdStarted={() => console.log('ad started')}
        onAdSkipped={() => console.log('ad skipped')}
        onAdManifestLoad={() => console.log('ad manifest load')}
        onAdManifestLoaded={() => console.log('ad manifest loaded')}
        onAdQuartile={() => console.log('ad quartile')}
        */
        player={player}
        onReady={onReady}

				// Listen to fullscreen specific events
        fullscreenHandler={fullscreenHandler}
        /*
        onFullscreenEnter={onFullscreenEnter}
        onFullscreenExit={onFullscreenExit}
        onFullscreenEnabled={onFullscreenEnabled}
        onFullscreenDisabled={onFullscreenDisabled}
        */
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    display: 'flex',
    flex: 1,
    minHeight: 200,
    minWidth: 400,
    zIndex: 100,
  },
  playerFullscreen: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
  },
});
