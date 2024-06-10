package com.remotecommandcenter;

import com.facebook.react.bridge.ReactApplicationContext;
import javax.security.auth.callback.Callback;

abstract class RemoteCommandCenterSpec extends NativeRemoteCommandCenterSpec {
  RemoteCommandCenterSpec(ReactApplicationContext context) {
    super(context);
  }
}
