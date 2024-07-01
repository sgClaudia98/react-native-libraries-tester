/**
 * Enum representing the auto-update modes for usage properties.
 */
type UsagePropertiesAutoUpdateMode =
  | 'FOREGROUND_ONLY'
  | 'FOREGROUND_AND_BACKGROUND'
  | 'DISABLED';

/**
 * Interface representing the data_1p object used in ComScoreParams.
 */
type Data1p = {
  publisherId?: string; // The publisher ID.
  cs_fpid?: string; // First-party ID.
  cs_fpit?: string; // First-party ID timestamp.
  cs_fpdm?: string; // First-party ID domain.
  cs_fpdt?: string; // First-party ID TTL (Time To Live).
};

// Communicating User Consent (label: "cs_ucfr" )
type CommunicatingUserConsentValue = 
    | '0' // User has not given consent or has opted out
    | '1' // User has given consent
    | '' // User has not taken an action

/**
 * Interface representing the parameters for initializing ComScore.
 */
type ComScoreParams = {
  publisherId: string; // The publisher ID.
  applicationName?: string; // The name of the application.
  usagePropertiesAutoUpdateMode?: UsagePropertiesAutoUpdateMode; // The auto-update mode for usage properties.
  usagePropertiesAutoUpdateInterval?: number; // The interval for auto-updating usage properties.
  data_1p?: Data1p; // First-party data parameters.
};

export type {UsagePropertiesAutoUpdateMode, Data1p, CommunicatingUserConsentValue, ComScoreParams}