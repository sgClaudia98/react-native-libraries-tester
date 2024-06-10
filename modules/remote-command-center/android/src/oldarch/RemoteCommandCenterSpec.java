package com.remotecommandcenter;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;

abstract class RemoteCommandCenterSpec extends ReactContextBaseJavaModule {
  RemoteCommandCenterSpec(ReactApplicationContext context) {
    super(context);
  }

   public abstract void setEventListener(Callback callback, Promise promise);
   public abstract void destroy(Promise promise);
}
