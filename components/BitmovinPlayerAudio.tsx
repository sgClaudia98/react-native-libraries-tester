import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  usePlayer,
  SourceType,
  PlayerView,
  AudioSession,
  AdSourceType,
  ReadyEvent,
} from 'bitmovin-player-react-native';
import Slider from '@react-native-community/slider';

export default function PlayerSampleAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(100);

  const player = usePlayer({
    // The only required parameter is the license key but it can be omitted from code upon correct
    // Info.plist/AndroidManifest.xml configuration.
    //
    // Head to `Configuring your License` for more information.
    licenseKey: '9a30c8cf-d987-4234-91f8-095eaf66cf56',
    analyticsConfig: {
      // Bitmovin analytics key from the Analytics Dashboard
      licenseKey: 'b4289f8e-e3a7-4cb2-94cc-ab06a73ea4d8',
    },
    /*
    advertisingConfig: {
      // Each object in `schedule` represents an `AdItem`.
      schedule: [
        // An `AdItem` represents a time slot within the streamed content dedicated to ads playback.
        {
          // Each item specifies a list of sources with a type and URL to the ad manifest in the ads
          // server. All but the first source act as fallback if the first one fails to load.
          // The start and end of an ad break are signaled via `AdBreakStartedEvent` and `AdBreakFinishedEvent`.
          sources: [
            {
              type: AdSourceType.IMA,
              tag: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=',
            },
            // Fallback sources...
          ],
          // Each item also specifies the position where it should appear during playback.
          // The possible position values are documented below.
          // The default value is `pre`.
          position: '20%',
        },
      ],
    },
    */
  });

  useEffect(() => {
    console.log('PLAYER!!!', player);
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

    player.load({
      url: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      type: SourceType.HLS,
      title: 'Art of Motion',
      analyticsSourceMetadata: {
        videoId: 'reactnative-wizard-Art_of_Motion-1715012356323',
        title: 'Art of Motion',
        isLive: false,
      }, });
  }, [player]);

  // onReady is called when the player has downloaded initial
  // video and audio and is ready to start playback.
  const onReady = useCallback(
    (event: ReadyEvent) => {
      // Start playback
      player.play();
      console.log(event.timestamp);
      setIsPlaying(true)
    },
    [player]
  );



  const togglePlayback = () => {
    if (player.isInitialized) {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipBackward = async () => {
    const currentTime = await player.getCurrentTime();
    let newTime = Math.max(currentTime - 10, 0 );
    player.seek(newTime);
  };

  const skipForward = async () => {
    const currentTime = await player.getCurrentTime();
    const maxTime = await player.getDuration();
    let newTime = Math.min(currentTime + 10, maxTime );
    player.seek(newTime);
    player.getPlaybackSpeed
  };

  const onSliderChange = (value: number) => {
    player.seek(value);
    setCurrentTime(value);
  };

  useEffect(() => {
    /*
    if (player.isInitialized) {

      const timer = setInterval(async () => {
        const time = await player.getCurrentTime();
        setCurrentTime(time);
        const duration = await player.getDuration();
        setMaxTime(duration);
        
      }, 1000);
      
      return () => clearInterval(timer);
    } 
    */
  }, [player.isInitialized]);

  return (
    <View style={styles.container}>
      <PlayerView player={player} onReady={onReady} style={styles.audioPlayer} />
      <View style={styles.controls}>
        <View style={styles.leftControls}>
          <Text>I M</Text>
          <Text>Hola HOla</Text>
          <View style={styles.progressContainer}>
        <Slider
          value={currentTime}
          maximumValue={maxTime}
          minimumValue={0}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="grey"
          onValueChange={onSliderChange}
        />
      </View>
        </View>
        <View style={styles.rightControls}>
          <Button title="-" color="black" onPress={skipBackward} />
          <Button
            title={isPlaying ? 'pause' : 'play'}
            color="black"
            onPress={togglePlayback}
          />

          <Button title="+" color="black" onPress={skipForward} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    backgroundColor: 'red',
    flex: 1,
    minHeight: 200,
  },
  controls: {
    paddingVertical: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  leftControls: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  audioPlayer: {
    width: 1,
    height: 1,
  },
  progressContainer: {
    padding: 0,
    width: "100%",
  },
});
