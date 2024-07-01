package com.ccma.comscore;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

abstract class ComscoreSpec extends ReactContextBaseJavaModule {
  ComscoreSpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract void initializeComScore(ReadableMap params, Promise promise);
  public abstract void updateConsent(String consentValue, Promise promise);
  public abstract void trackScreen(String pageName, Promise promise);
  public abstract void trackScreenWithData(String pageName, ReadableMap additionalParams, Promise promise);
  public abstract void update1PData(ReadableMap params, Promise promise);
}
