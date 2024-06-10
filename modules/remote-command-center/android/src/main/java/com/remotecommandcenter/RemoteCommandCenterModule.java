package com.remotecommandcenter;

import androidx.annotation.NonNull;
import main.java.com.remotecommandcenter.RemoteCommandEvent;

import javax.naming.Context;
import javax.security.auth.callback.Callback;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RemoteCommandCenterModule extends RemoteCommandCenterSpec {
  public static final String NAME = "RemoteCommandCenter";


  private Callback _callback;

  RemoteCommandCenterModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @Override
  public void setEventListener(Callback callback, Promise promise) {
    this._callback = callback;
    promise.resolve(null);
  }

  @Override
  public void destroy(Promise promise) {
   // super.destroy();
    // Release any resources here
    promise.resolve(null);
  }

  private void sendEvent(string event) {
    if (this._callback) {
      this._callback.invoke(event);
    }
  }

}
