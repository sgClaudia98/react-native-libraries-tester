package com.comscore;

import android.util.Log;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ComscoreService {

    private static final String CS_FPID = "cs_fpid";
    private static final String CS_FPIT = "cs_fpit";
    private static final String CS_FPDM = "cs_fpdm";
    private static final String CS_FPDT = "cs_fpdt";
    private static final String CS_UCFR = "cs_ucfr";

    public static void initializeComScore(ReadableMap params) {
        WritableMap writableMap = Arguments.createMap();
        writableMap.merge(params);

        // Extract required parameter
        String publisherId = writableMap.getString("publisherId");
        Log.i("ComscoreService", "Setting publisherId: " + publisherId);

        // Extract optional parameters
        String applicationName = params.hasKey("applicationName")
                ? params.getString("applicationName")
                : null;
        String usagePropertiesAutoUpdateMode = params.hasKey("usagePropertiesAutoUpdateMode")
                ? params.getString("usagePropertiesAutoUpdateMode")
                : null;
        Integer usagePropertiesAutoUpdateInterval = params.hasKey("usagePropertiesAutoUpdateInterval")
                ? params.getInt("usagePropertiesAutoUpdateInterval")
                : null;
        Log.i("ComscoreService", "Initializing ComScore");

        //1P-Data
        ReadableMap param_labels = writableMap.hasKey("data_1p")
                ? (ReadableMap) writableMap.getMap("data_1p")
                : null;
        HashMap<String, String> labels = new HashMap<String, String>();
        if (param_labels != null) {
            Log.i("ComscoreService", "Data_1p is not null");
            if (param_labels.hasKey(CS_FPID)) {
                labels.put(CS_FPID, param_labels.getString(CS_FPID));
            }
            if (param_labels.hasKey(CS_FPIT)) {
                labels.put(CS_FPIT, param_labels.getString(CS_FPIT));
            }
            if (param_labels.hasKey(CS_FPDM)) {
                labels.put(CS_FPDM, param_labels.getString(CS_FPDM));
            }
            if (param_labels.hasKey(CS_FPDT)) {
                labels.put(CS_FPDT, param_labels.getString(CS_FPDT));
            }
            if (param_labels.hasKey(CS_UCFR)) { // User Consent
                labels.put(CS_UCFR, param_labels.getString(CS_UCFR));
            }
        }
        
        // Create a PublisherConfiguration.Builder object with the provided settings
        PublisherConfiguration myPublisherConfig;
        if (!labels.isEmpty()) {
            myPublisherConfig = new PublisherConfiguration.Builder()
                    .publisherId(publisherId)
                    .persistentLabels(labels)
                    .build();
            Log.i("ComscoreService", "Publisher build with persistent Labels");
        } else {
            myPublisherConfig = new PublisherConfiguration.Builder()
                    .publisherId(publisherId)
                    .build();
            Log.i("ComscoreService", "Publisher build without persistent Labels");
        }
        // Add the publisher configuration to the Analytics singleton
        Analytics.getConfiguration().addClient(myPublisherConfig);

        // Apply applicationName if provided
        if (applicationName != null && !applicationName.isEmpty()) {
            Log.i("ComscoreService", "Setting applicationName: " + applicationName);
            Analytics.getConfiguration().setApplicationName(applicationName); // Correct method name is publisherName()
        }

        // Apply general configuration settings if provided
        if (usagePropertiesAutoUpdateMode != null && !usagePropertiesAutoUpdateMode.isEmpty()) {
            // Parse the update mode string into the corresponding enum value
            int autoUpdateMode = parseUpdateMode(usagePropertiesAutoUpdateMode);
            Log.i("ComscoreService", "Setting usagePropertiesAutoUpdateMode: " + autoUpdateMode);
            // Set the usagePropertiesAutoUpdateMode
            Analytics.getConfiguration().setUsagePropertiesAutoUpdateMode(autoUpdateMode);
        }

        // Apply usagePropertiesAutoUpdateInterval if provided
        if (usagePropertiesAutoUpdateInterval != null && usagePropertiesAutoUpdateInterval > 0) {
            // Ensure that usagePropertiesAutoUpdateInterval is in seconds
            // Here, we assume that usagePropertiesAutoUpdateInterval is already in seconds
            Log.i("ComscoreService", "Setting usagePropertiesAutoUpdateInterval: " + usagePropertiesAutoUpdateInterval);
            Analytics.getConfiguration().setUsagePropertiesAutoUpdateInterval(usagePropertiesAutoUpdateInterval);
        }

        //  Test Mode output the request URLs on standard output
        Analytics.getConfiguration().enableImplementationValidationMode(); //TODO: Remove for Production
        // Start the ComScore library
        Analytics.start(ReactApplicationContextProvider.getInstance().get());
    }

    public static void updateConsent(String consentValue) {
        Log.i("ComscoreService", "updateConsent: " + consentValue);
        Analytics.getConfiguration().setPersistentLabel(CS_UCFR, consentValue);
        Analytics.notifyHiddenEvent();
    }

    public static void trackScreen(String pageName) {
        if (pageName == null) {
            Log.e("ComscoreService", "trackScreen: pageName is null.");
            throw new Error("trackScreen: pageName is null.");
        }
        Log.i("ComscoreService", "trackScreen page name: " + pageName);
        Analytics.notifyViewEvent(Collections.singletonMap("ns_category", pageName));
        Log.i("ComscoreService", "notifyViewEvent called successfully.");
    }

    public static void trackScreenWithData(String pageName, ReadableMap additionalParams) {
        if (pageName == null) {
            Log.e("ComscoreService", "trackScreenWithData: pageName is null.");
            throw new Error("trackScreenWithData: pageName is null.");
        }
        Log.i("ComscoreService", "trackScreenWithData page name: " + pageName);
        Map<String, String> params = new HashMap<>();
        params.put("ns_category", pageName);

        // Merge additionalParams into params
        if (additionalParams != null) {
            ReadableMapKeySetIterator iterator = additionalParams.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                params.put(key, additionalParams.getString(key));
            }
        }

        Analytics.notifyViewEvent(params);
        Log.i("ComscoreService", "notifyViewEvent called successfully.");
    }

    public static void update1PData(ReadableMap params) {
        try {
            if (params == null || !params.hasKey("publisherId")) {
                Log.e("ComscoreService", "update1PData: publisherId is missing.");
                throw new Error("update1PData: publisherId is missing.");
            }

            String publisherId = params.getString("publisherId");
            PublisherConfiguration publisherConfig = Analytics.getConfiguration().getPublisherConfiguration(publisherId);

            // Loop through each key-value pair in the params map
            ReadableMapKeySetIterator iterator = params.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                //if key is publisher id then continue
                if ("publisherId".equals(key)) {
                    continue;
                }

                String value = params.getString(key);

                // Set the persistent label for the key-value pair
                publisherConfig.setPersistentLabel(key, value);
                Log.i("ComscoreService", "Setting persistent label: " + key + " - " + value);
            }
            Analytics.notifyHiddenEvent();
            Log.i("ComscoreService", "1p data updated.");
        } catch (Exception e) {
            Log.e("ComscoreService", "Error updating 1P data", e);
            throw new Error("Error updating 1P data");
        }
    }

    private static int parseUpdateMode(String modeString) {
        switch (modeString) {
            case "FOREGROUND_ONLY":
                return UsagePropertiesAutoUpdateMode.FOREGROUND_ONLY;
            case "FOREGROUND_AND_BACKGROUND":
                return UsagePropertiesAutoUpdateMode.FOREGROUND_AND_BACKGROUND;
            case "DISABLED":
                return UsagePropertiesAutoUpdateMode.DISABLED;
            default:
                return UsagePropertiesAutoUpdateMode.FOREGROUND_ONLY; // Default value
        }
    }

    private static void trackMediaOnBackground(boolean state) {
        try {
          if (state == true) {
            Analytics.notifyUxActive();
          } else {
            Analytics.notifyUxInactive();
          }
          promise.resolve();
        } catch (Exception e) {
          Log.e("ComScoreModule", "Error updating trackMediaOnBackground", e);
          promise.reject("Error updating trackMediaOnBackground");
        }
      }
}
