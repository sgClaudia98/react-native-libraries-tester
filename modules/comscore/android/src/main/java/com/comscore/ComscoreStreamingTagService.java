package com.ccma.comscore;

import android.util.Log;

import com.facebook.react.bridge.ReadableMap;

import com.comscore.Analytics;
import com.comscore.streaming.StreamingAnalytics;
import com.comscore.streaming.ContentMetadata;
import com.comscore.streaming.AdvertisementMetadata;

public class ComscoreStreamingTagService {
    private StreamingAnalytics sa = null;
    private ContentMetadata cm = null;

    /**
     * Constructor for initializing StreamingAnalytics with implementation details.
     *
     * @param implementationDetails ReadableMap containing implementation details:
     *                              - implementationId (optional): Implementation ID
     *                              - projectId (optional): Project ID
     *                              - mediaPlayerName (optional): Media player name
     *                              - mediaPlayerVersion (optional): Media player version
     */
    ComscoreStreamingTagService(ReadableMap implementationDetails) {
        this.initialize(implementationDetails);
    }

    public void restart (ReadableMap implementationDetails) {
        this.cm = null;
        this.initialize(implementationDetails);
    }

    /**
     * Used to restart service
     */
    private void initialize (ReadableMap implementationDetails) {
        sa = new StreamingAnalytics();

        String implementationId = implementationDetails.hasKey("implementationId")
                ? implementationDetails.getString("implementationId")
                : null;
        String projectId = implementationDetails.hasKey("projectId")
                ? implementationDetails.getString("projectId")
                : null;
        String mediaPlayerName = implementationDetails.hasKey("mediaPlayerName")
                ? implementationDetails.getString("mediaPlayerName")
                : null;
        String mediaPlayerVersion = implementationDetails.hasKey("mediaPlayerVersion")
                ? implementationDetails.getString("mediaPlayerVersion")
                : null;

        if (implementationId != null && !implementationId.isEmpty()) {
            sa.setImplementationId(implementationId);
        }

        if (projectId != null && !projectId.isEmpty()) {
            sa.setProjectId(projectId);
        }

        if (mediaPlayerName != null && !mediaPlayerName.isEmpty()) {
            sa.setMediaPlayerName(mediaPlayerName);
        }

        if (mediaPlayerVersion != null && !mediaPlayerVersion.isEmpty()) {
            sa.setMediaPlayerVersion(mediaPlayerVersion);
        }
    }

    /**
     * Method to start streaming content playback.
     *
     * @param contentMetadata ReadableMap containing metadata related to the content being played.
     */
    public void start(ReadableMap contentMetadata) {
        sa.createPlaybackSession();
        sa.setMetadata( this.parseContentMetadata(contentMetadata) );
    }

    /**
     * Method to end streaming content playback.
     */
    public void end() {
        sa.notifyEnd();
    }

    /**
     * Method to start playing an ad.
     *
     * @param adMetadata ReadableMap containing metadata related to the ad being played.
     */
    public void adStart(ReadableMap adMetadata) {
        sa.setMetadata( this.parseAdMetadata(adMetadata) );
    }

    /**
     * Method to end playing an ad.
     */
    public void adEnd() {
        sa.setMetadata(this.cm);
    }

    /**
     * Method to indicate start of buffering.
     *
     */
    public void bufferStart() {
      sa.notifyBufferStart();
    }

    /**
     * Method to pause buffering.
     *
     */
    public void bufferStop() {
      sa.notifyBufferStop();
    }

    /**
     * Method to indicate start of seeking within content.
     *
     */
    public void seekStart() {
        sa.notifySeekStart();
    }

    /**
     * Method to indicate end of seeking within content.
     *
     * @param contentMetadata ReadableMap containing metadata related to the content being seeked.
     */
    public void seekEnd(ReadableMap seekData) {
        // TODO: Implement seekEnd method
    }

    /**
     * Method to indicate start of content playback.
     *
     * @param contentMetadata ReadableMap containing metadata related to the content being played.
     */
    public void play(ReadableMap contentMetadata) {
        sa.notifyPlay();
    }

    /**
     * Method to pause content playback.
     *
     * @param contentMetadata ReadableMap containing metadata related to the content being played.
     */
    public void pause(ReadableMap contentMetadata) {
        sa.notifyPause();
    }

    private AdvertisementMetadata parseAdMetadata(ReadableMap adMetadata) {
        Integer length = adMetadata.hasKey("length")
                ? adMetadata.getInt("length")
                : 0;
        int mediaType = TypeParser.parseAdvertisement(adMetadata.getString("mediaType"));

        AdvertisementMetadata am = new AdvertisementMetadata.Builder()
            .mediaType( mediaType )
            .relatedContentMetadata( this.cm )
            .length( length ) // 20s in milliseconds
            .build();
        
        return am;
    }

    private ContentMetadata parseContentMetadata(ReadableMap contentMetadata) {

        Integer length = contentMetadata.hasKey("length")
            ? contentMetadata.getInt("length")
            : 0;

        String c3 = contentMetadata.hasKey("c3")
            ? contentMetadata.getString("c3")
            : null;
        String c4 = contentMetadata.hasKey("c4")
            ? contentMetadata.getString("c4")
            : null;
        String c6 = contentMetadata.hasKey("c6")
            ? contentMetadata.getString("c6")
            : null;
        
        String uniqueId = contentMetadata.hasKey("uniqueId")
            ? contentMetadata.getString("uniqueId")
            : null;

        String stationTitle = contentMetadata.hasKey("stationTitle")
            ? contentMetadata.getString("stationTitle")
            : null;

        String publisherName = contentMetadata.hasKey("publisherName")
            ? contentMetadata.getString("publisherName")
            : null;

        String programTitle = contentMetadata.hasKey("programTitle")
            ? contentMetadata.getString("programTitle")
            : null;
            
        String genreName = contentMetadata.hasKey("genreName")
            ? contentMetadata.getString("genreName")
            : null;

        boolean classifyAsCompleteEpisode = contentMetadata.hasKey("classifyAsCompleteEpisode") 
            ? contentMetadata.getBoolean("classifyAsCompleteEpisode")
            : true;


        int mediaType = TypeParser.parseContent(contentMetadata.getString("mediaType"));

        cm = new ContentMetadata.Builder()
            .mediaType( mediaType )
            .uniqueId( uniqueId )
            .length( length ) // 23m58s in milliseconds
            .dictionaryClassificationC3( c3 )
            .dictionaryClassificationC4( c4 )
            .dictionaryClassificationC6( c6 )
            .stationTitle( stationTitle )
            .publisherName( publisherName )
            .programTitle( programTitle )
            .genreName( genreName )
            .classifyAsCompleteEpisode( classifyAsCompleteEpisode )
            .build();

        return cm;
    }

    private void destroy() {
        this.cm = null;
        this.sa = null;
    }

}
