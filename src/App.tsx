import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VideoScreen from './screens/VideoScreen';
import AudioScreen from './screens/AudioScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="VIDEO" component={VideoScreen} />
        <Tab.Screen name="AUDIO" component={AudioScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
