import * as React from 'react';
import { View, Button, ScrollView } from 'react-native';
import AudioDifferentSource from '../uc_audio/DifferentSource';
import AudioLive from '../uc_audio/Live';
import AudioStatistics from '../uc_audio/Statistics';
import AudioOnDemand from '../uc_audio/OnDemand';
import AudioAdvertising from '../uc_audio/Advertising';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayerSampleAudio from '../components/BitmovinPlayerAudio';

const Stack = createNativeStackNavigator();

const AudioHome: React.FC<{navigation: any}> = ({ navigation }) => {
  return (
    <View  style={{height: '100%'}}>
      <PlayerSampleAudio/>
      <Button title="On Demand" onPress={() => navigation.navigate('OnDemand')} />
      <Button title="Different Source" onPress={() => navigation.navigate('DifferentSource')} />
      <Button title="Live" onPress={() => navigation.navigate('Live')} />
      <Button title="Statistics" onPress={() => navigation.navigate('Statistics')} />
      <Button title="Advertising" onPress={() => navigation.navigate('Advertising')} />
    </View>
  );
};

const AudioScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Audio">
      <Stack.Screen name="Home" component={AudioHome} />
      <Stack.Screen name="OnDemand" component={AudioOnDemand} />
      <Stack.Screen name="DifferentSource" component={AudioDifferentSource} />
      <Stack.Screen name="Live" component={AudioLive} />
      <Stack.Screen name="Statistics" component={AudioStatistics} />
      <Stack.Screen name="Advertising" component={AudioAdvertising} />
    </Stack.Navigator>
  );
};

export default AudioScreen;
