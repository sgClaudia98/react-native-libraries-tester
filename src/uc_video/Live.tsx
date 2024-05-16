import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VideoLive: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Video Live</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoLive;
