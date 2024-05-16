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
import {getSourceConfig} from '../utils/media';
import {mockApiMedia} from '../data/MockApiMedia';

export default function PlayerSampleAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(100);

  const MOCK = mockApiMedia;

  const player = usePlayer({
    // The only required parameter is the license key but it can be omitted from code upon correct
    // Info.plist/AndroidManifest.xml configuration.
    //
    // Head to `Configuring your License` for more information.
    licenseKey: '9a30c8cf-d987-4234-91f8-095eaf66cf56',
    /*
    analyticsConfig: {
      // Bitmovin analytics key from the Analytics Dashboard
      licenseKey: 'b4289f8e-e3a7-4cb2-94cc-ab06a73ea4d8',
    },*/
  });
  useEffect(() => {
    console.log('PLAYER!!!');
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
    console.log('Player load config ');

    // Advertising
  }, [player.isInitialized]);

  // onReady is called when the player has downloaded initial
  // video and audio and is ready to start playback.
  const onReady = useCallback(
    (event: ReadyEvent) => {
      // Start playback
      console.log('On ready');
      player.play();
      console.log(event.timestamp);
      setIsPlaying(true);
    },
    [player],
  );

  // Play/Pause
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

  // Backwards
  const skipBackward = async () => {
    const currentTime = await player.getCurrentTime();
    let newTime = Math.max(currentTime - 10, 0);
    player.seek(newTime);
  };

  // Forward
  const skipForward = async () => {
    const currentTime = await player.getCurrentTime();
    const maxTime = await player.getDuration();
    let newTime = Math.min(currentTime + 10, maxTime);
    player.seek(newTime);
    player.getPlaybackSpeed;
  };

  // Seek
  const onSliderChange = (value: number) => {
    player.seek(value);
    setCurrentTime(value);
  };

  // Listener position
  useEffect(() => {
    if (player.isInitialized) {
      console.log('Initialized');
      const timer = setInterval(async () => {
        const time = await player.getCurrentTime();
        setCurrentTime(time);
        const duration = await player.getDuration();
        setMaxTime(duration);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [player.isInitialized]);

  return (
    <View style={styles.controls}>
      <PlayerView
        player={player}
        onPlayerError={() => console.log('player error')}
        onAdError={() => console.log('AD error')}
        onSourceError={() => console.log('source error')}
        onAdFinished={() => {
          console.log('ad finish');
          player.play();
        }}
        onReady={onReady}
        style={styles.audioPlayer}
        onAdBreakStarted={() => console.log('ad started')}
        onAdBreakFinished={() => console.log('ad finish')}
      />
      <View style={styles.leftControls}>
        <Text>{'<i> <i>'}</Text>
        <Text>{MOCK.informacio.titol}</Text>
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
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    minHeight: 100,
    minWidth: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    paddingHorizontal: 10,
    zIndex: 200,
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
    width: '100%',
  },
});
