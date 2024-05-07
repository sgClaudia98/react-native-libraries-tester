import React, {useEffect, useCallback} from 'react';
import {View, Platform, StyleSheet, Button} from 'react-native';
import {
  usePlayer,
  SourceType,
  PlayerView,
  AudioSession,
  AdSourceType,
} from 'bitmovin-player-react-native';

export default function PlayerSample() {
  const player = usePlayer({
    // The only required parameter is the license key but it can be omitted from code upon correct
    // Info.plist/AndroidManifest.xml configuration.
    //
    // Head to `Configuring your License` for more information.
    licenseKey: '9a30c8cf-d987-4234-91f8-095eaf66cf56',
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
  }
  );
  
  useEffect(() => {
    console.log("PLAYER!!!", player)
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
      url:
        Platform.OS === 'ios'
          ? 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
          : 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
      type: Platform.OS === 'ios' ? SourceType.HLS : SourceType.DASH,
      title: 'Art of Motion',
      poster: "https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/poster.jpg"

    });
  }, [player]);

  // onReady is called when the player has downloaded initial
  // video and audio and is ready to start playback.
  const onReady = useCallback(
    (event: any) => {
      // Start playback
      console.log("PLAY!!!")
      player.play();
      console.log(event.timestamp);
    },
    [player],
  );

  const onPause = () => {
    player.pause();
  }
  

  return (
    <View style={styles.flex1}>
      <PlayerView style={styles.flex1} player={player} onReady={onReady} />
      <View>
      <Button
  onPress={onPause}
  title="Pause"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    minHeight: 200
  },
});

