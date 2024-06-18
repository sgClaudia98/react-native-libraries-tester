package com.mediacontrols;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;

abstract class MediaControlsSpec extends ReactContextBaseJavaModule {
  MediaControlsSpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract void initialize();
  public abstract void updateNowPlaying(String title);
}
