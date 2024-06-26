package com.mediacontrols;

import android.content.Context;
import androidx.annotation.NonNull;
import androidx.media3.common.MediaMetadata;
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

  private MediaSession mediaSession;

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
    //mediaSession.setActive(true);
  }

  @ReactMethod
  public void updateNowPlaying(String title) {
    /*
    MediaMetadataCompat metadata = new MediaMetadataCompat.Builder()
        .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title)
        .build();
    mediaSession.setMetadata(metadata);
    */
    sendEvent("updateNowPlaying", null);
  }

  private void initMediaSession() {
    /*
    mediaSession = new MediaSession(getReactApplicationContext(), "MusicService");
    mediaSession.setCallback(new MediaSession.Callback() {
      @Override
      public void onCommand(Player player, SessionCommand command, Bundle extras, ResultReceiver cb) {
        // Implement your callback here
      }
    });
    */
    sendEvent("initMediaSession", null);
  }

  private void sendEvent(String eventName, Object params) {
    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
  }

  // Método para agregar listeners
  @ReactMethod
  public void addListener(String eventName) {
    // Deja este método vacío; es requerido para la compatibilidad con NativeEventEmitter
  }

  // Método para remover listeners
  @ReactMethod
  public void removeListeners(Integer count) {
    // Deja este método vacío; es requerido para la compatibilidad con NativeEventEmitter
  }
}
