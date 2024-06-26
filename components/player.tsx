import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeModules } from 'react-native';
import { initialize, updateNowPlaying, subscribeToMediaControlEvents } from 'react-native-media-controls';

const Player = () => {

  useEffect(() => {
    // Inicializar el módulo nativo
    initialize();

    // Suscribirse al evento 'updateNowPlaying'
    const unsubscribeUpdateNowPlaying = subscribeToMediaControlEvents('updateNowPlaying', (eventData) => {
      console.log('updateNowPlaying event received:', eventData);
      // Aquí puedes actualizar el estado de tu componente o hacer cualquier otra cosa con los datos del evento
    });

    // Suscribirse al evento 'initMediaSession'
    const unsubscribeInitMediaSession = subscribeToMediaControlEvents('initMediaSession', (eventData) => {
      console.log('initMediaSession event received:', eventData);
      // Aquí puedes actualizar el estado de tu componente o hacer cualquier otra cosa con los datos del evento
    });

    // Limpiar las suscripciones al desmontar el componente
    return () => {
      unsubscribeUpdateNowPlaying();
      unsubscribeInitMediaSession();
    };
  }, []);

  const handleUpdateNowPlaying = () => {
    updateNowPlaying('New Song Title');
  };

  return (
    <View>
      <Text>Media Player</Text>
      <View style={styles.buttonContainer}>
        <Button title="Update Now Playing" onPress={handleUpdateNowPlaying} />
        <Button title="Play" onPress={() => console.log('Play pressed')} disabled/>
        <Button title="Pause" onPress={() => console.log('Pause pressed')} disabled/>
        <Button title="Go Back" onPress={() => console.log('Go Back pressed')} disabled/>
        <Button title="Go Forward" onPress={() => console.log('Go Forward pressed')} disabled/>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    gap: 5,
    marginTop: 32,
    paddingHorizontal: 24,
  },
});


export default Player;
