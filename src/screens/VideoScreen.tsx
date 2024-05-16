import * as React from 'react';
import { View, Button } from 'react-native';
import VideoOnDemand from '../uc_video/OnDemand';
import VideoDifferentSources from '../uc_video/DifferentSource';
import VideoLive from '../uc_video/Live';
import VideoStatistics from '../uc_video/Statistics';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoAdvertising from '../uc_video/Advertising';
import PlayerSample from '../components/BitmovinPlayer';

const Stack = createNativeStackNavigator();

const VideoHome: React.FC<{navigation: any}> = ({ navigation }) => {
  return (
    <View>
      <PlayerSample/>
      <Button title="On Demand" onPress={() => navigation.navigate('OnDemand')} />
      <Button title="Different Source" onPress={() => navigation.navigate('DifferentSource')} />
      <Button title="Live" onPress={() => navigation.navigate('Live')} />
      <Button title="Statistics" onPress={() => navigation.navigate('Statistics')} />
      <Button title="Advertising" onPress={() => navigation.navigate('Advertising')} />
    </View>
  );
};

const VideoScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Video">
      <Stack.Screen name="Home" component={VideoHome} />
      <Stack.Screen name="OnDemand" component={VideoOnDemand} />
      <Stack.Screen name="DifferentSource" component={VideoDifferentSources} />
      <Stack.Screen name="Live" component={VideoLive} />
      <Stack.Screen name="Statistics" component={VideoStatistics} />
      <Stack.Screen name="Advertising" component={VideoAdvertising} />
    </Stack.Navigator>
  );
};

export default VideoScreen;
