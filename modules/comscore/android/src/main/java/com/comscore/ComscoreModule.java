package com.ccma.comscore;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;


public class ComscoreModule extends ComscoreSpec {

    public static final String NAME = "Comscore";

    ComscoreModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void initializeComScore(ReadableMap params, Promise promise) {
        try {
            ComscoreService.initializeComScore(getReactApplicationContext(), params);
            //promise.resolve();
        } catch (Exception e) {
            Log.e("ComscoreModule", "Error initializing ComScore", e);
            promise.reject("Error initializing ComScore");
        }
    }

    @ReactMethod
    public void updateConsent(String consentValue, Promise promise) {
        try {
            ComscoreService.updateConsent(consentValue);
            //promise.resolve();
        } catch (Exception e) {
            Log.e("ComscoreModule", "Error updating consent", e);
            promise.reject("Error updating consent");
        }
    }

    @ReactMethod
    public void trackScreen(String pageName, Promise promise) {
        try {
            ComscoreService.trackScreen(pageName);
            //promise.resolve();
        } catch (Exception e) {
            Log.e("ComscoreModule", "Error tracking screen", e);
            promise.reject("Error tracking screen");
        }
    }

    @ReactMethod
    public void trackScreenWithData(String pageName, ReadableMap additionalParams, Promise promise) {
        try {
            ComscoreService.trackScreenWithData(pageName, additionalParams);
            //promise.resolve();
        } catch (Exception e) {
            Log.e("ComscoreModule", "Error tracking screen with data", e);
            promise.reject("Error tracking screen with data");
        }
    }

    @ReactMethod
    public void update1PData(ReadableMap params, Promise promise) {
        try {
            ComscoreService.update1PData(params);
            //promise.resolve();
        } catch (Exception e) {
            Log.e("ComscoreModule", "Error updating 1P data", e);
            promise.reject("Error updating 1P data");
        }
    }

    public void trackMediaOnBackground(boolean state, Promise promise) {
      try {
        ComscoreService.trackMediaOnBackground(state);
        //promise.resolve();
      } catch (Exception e) {
        Log.e("ComScoreModule", "Error updating trackMediaOnBackground", e);
        promise.reject("Error updating trackMediaOnBackground");
      }
    }
}
