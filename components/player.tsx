import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeModules } from 'react-native';
import * as Comscore from 'react-native-comscore';


const Player = () => {
  Comscore.initializeComScore({
    publisherId: ""
  })

  return <View>
        <Text>Media Player</Text>
      </View>
};
const styles = StyleSheet.create({
  buttonContainer: {
    gap: 5,
    marginTop: 32,
    paddingHorizontal: 24,
  },
});


export default Player;
