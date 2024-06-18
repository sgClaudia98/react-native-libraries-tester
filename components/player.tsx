import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { initialize, updateNowPlaying } from 'react-native-media-controls';

const { MediaControls } = NativeModules;
const mediaControlsEmitter = new NativeEventEmitter(MediaControls);

const Player = () => {
  useEffect(() => {
    initialize();
    updateNowPlaying('Song Title');

    const onPlaySubscription = mediaControlsEmitter.addListener('onPlay', () => {
      console.log('Play event');
    });

    const onPauseSubscription = mediaControlsEmitter.addListener('onPause', () => {
      console.log('Pause event');
    });

    const onGoBackSubscription = mediaControlsEmitter.addListener('onGoBack', () => {
      console.log('Go Back event');
    });

    const onGoForwardSubscription = mediaControlsEmitter.addListener('onGoForward', () => {
      console.log('Go Forward event');
    });

    return () => {
      onPlaySubscription.remove();
      onPauseSubscription.remove();
      onGoBackSubscription.remove();
      onGoForwardSubscription.remove();
    };
  }, []);

  return (
    <View>
      <Text>Media Player</Text>
      <Button title="Play" onPress={() => console.log('Play pressed')} />
      <Button title="Pause" onPress={() => console.log('Pause pressed')} />
      <Button title="Go Back" onPress={() => console.log('Go Back pressed')} />
      <Button title="Go Forward" onPress={() => console.log('Go Forward pressed')} />
    </View>
  );
};

export default Player;
