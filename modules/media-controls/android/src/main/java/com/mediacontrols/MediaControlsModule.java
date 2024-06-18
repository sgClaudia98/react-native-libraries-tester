package com.mediacontrols;

import android.content.ComponentName;
import android.content.Context;

import androidx.annotation.NonNull;
import androidx.media3.common.MediaMetadata;
import androidx.media3.session.MediaButtonReceiver;
import androidx.media3.session.MediaSession;
import androidx.media3.session.SessionCommand;
import androidx.media3.session.SessionResult;
import androidx.media3.common.Player;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MediaControlsModule extends MediaControlsSpec {
  public static final String NAME = "MediaControls";

  private MediaSessionCompat mediaSession;

  MediaControlsModule(ReactApplicationContext context) {
    super(context);
    initMediaSession();
  }

  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public void initialize() {
    mediaSession.setActive(true);
  }

  @ReactMethod
  public void updateNowPlaying(String title) {
    MediaMetadataCompat metadata = new MediaMetadataCompat.Builder()
        .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title)
        .build();
    mediaSession.setMetadata(metadata);
  }

  private void initMediaSession() {
    mediaSession = new MediaSession(this, "MusicService");
    mediaSession.setCallback(new MediaSessionCallback() {
      @Override
      public void onPlay() {
        sendEvent("onPlay", null);
      }

      @Override
      public void onPause() {
        sendEvent("onPause", null);
      }

      @Override
      public void onSkipToPrevious() {
        sendEvent("onGoBack", null);
      }

      @Override
      public void onSkipToNext() {
        sendEvent("onGoForward", null);
      }
    });
    mediaSession.setFlags(MediaSession.FLAG_HANDLES_MEDIA_BUTTONS |
        MediaSession.FLAG_HANDLES_TRANSPORT_CONTROLS);

  }

  private void sendEvent(String eventName, Object params) {
    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
  }
}
