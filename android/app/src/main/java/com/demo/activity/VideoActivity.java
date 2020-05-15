package com.demo.activity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.Toast;

import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.MergingMediaSource;
import com.google.android.exoplayer2.source.ProgressiveMediaSource;
import com.google.android.exoplayer2.source.SingleSampleMediaSource;
import com.google.android.exoplayer2.trackselection.AdaptiveTrackSelection;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelection;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.trackselection.TrackSelector;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.upstream.BandwidthMeter;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Log;
import com.google.android.exoplayer2.util.MimeTypes;
import com.google.android.exoplayer2.util.Util;
import com.squareup.picasso.Picasso;


public class VideoActivity extends Activity {
    private boolean playWhenReady = true;
    private int currentWindow = 0;
    private long playbackPosition = 0;
    private PlayerView playerView;
    private SimpleExoPlayer player;
    private PlaybackStateListener playbackStateListener;
    private TrackSelector trackSelector;
    // Flows Subs
    // 1 - MP4 or MKV with SUBS (media.subtitles == null)
    // 2 - MP4 or MKV with external SUBS (media.subtitles != null)
    // Flows Audio
    // 3 - MKV or MP4 - DUAL AUDIO
    //
    // if has subtitles (internal or external)
    //      then: Show toggle subtitles UI
    // if has multiple audio tracks
    //      then: Show track selector UI
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video);
        playerView = findViewById(R.id.video_view);
        BandwidthMeter bandwidthMeter = new DefaultBandwidthMeter();
        TrackSelection.Factory videoTrackSelectionFactory =
                new AdaptiveTrackSelection.Factory(bandwidthMeter);
        trackSelector =
                new DefaultTrackSelector(videoTrackSelectionFactory);
        playerView.setControllerAutoShow(false);
        playbackStateListener = new PlaybackStateListener();
        player = ExoPlayerFactory.newSimpleInstance(getApplicationContext(), trackSelector);

        //Poster
        ImageView poster = (ImageView) findViewById(R.id.poster);
        Picasso.get().load("https://node1.point5.live/1/vod/poster.jpg").into(poster);
        //Rating
        RatingBar rating = (RatingBar) findViewById(R.id.rating);
        rating.setRating((float) 5.0);


        //Buttons Actions
        ImageButton exo_captions =(ImageButton) findViewById(R.id.exo_captions);
        exo_captions.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("ALFONSO", "============CAPTIONS============");
                for(int i = 0; i < player.getCurrentTrackGroups().length; i++){
                    String format = player.getCurrentTrackGroups().get(i).getFormat(0).sampleMimeType;
                    String lang = player.getCurrentTrackGroups().get(i).getFormat(0).language;
                    String id = player.getCurrentTrackGroups().get(i).getFormat(0).id;
                    Log.d("groups", player.getCurrentTrackGroups().get(i).getFormat(0).toString());
                    if (format.contains("sub")) {
                        Log.d("SUBs", "This track is subtitles " + String.valueOf(i));
                    }
                }
//                DefaultTrackSelector.ParametersBuilder builder = parameters.buildUpon();
                Log.d("ALFONSO", "==========CAPTIONS END==========");
//
            }
        });
        ImageButton exo_audio =(ImageButton) findViewById(R.id.exo_audio);
        exo_audio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("ALFONSO", "AUDIO CLICKED");
                Toast toast = Toast.makeText(getApplicationContext(), "Audio Selector", Toast.LENGTH_SHORT);
                toast.show();
            }
        });

        //start
        player.setPlayWhenReady(playWhenReady);
        initializePlayer();
        hideSystemUi();
    }

    private void initializePlayer() {
        Context context = getApplicationContext();
        player.stop();
        player.seekTo(currentWindow, playbackPosition);
        player.addListener(playbackStateListener);
        playerView.setPlayer(player);

        String videoUrl = "https://ctvod.run/ctv/warden/the.simpsons.s27e21.mp4"; //"https://node1.point5.live/1/vod/movies/AWhiteWhiteDay.mkv";
        String subtitlesUrl = "https://node1.point5.live/1/vod/movies/MeBeforeYou.srt";
        Integer videoId = 500;
        String videoName = "Los Simpson - S27E21";

        Uri uri = Uri.parse(videoUrl);
        MediaSource mediaSource = buildMediaSource(uri);

        //load external subtitles
        if (subtitlesUrl != "") {
            // exoplayer stuff
            DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(this.getApplicationContext(),
                    Util.getUserAgent(context, context.getResources().getString(R.string.app_name)));
            //external subs text format default to "es" ?
            Format textFormat = Format.createTextSampleFormat(null, MimeTypes.APPLICATION_SUBRIP,
                    null, Format.NO_VALUE, Format.NO_VALUE, "es", null, Format.OFFSET_SAMPLE_RELATIVE);
            //subtitles url
            MediaSource textMediaSource = new SingleSampleMediaSource.Factory(dataSourceFactory)
                    .createMediaSource(Uri.parse(subtitlesUrl), textFormat, C.TIME_UNSET);
            //merge first media source with this(subtitles)
            mediaSource = new MergingMediaSource(mediaSource, textMediaSource);
        }

        player.prepare(mediaSource, false, false); // plays eventually
    }

    private MediaSource buildMediaSource(Uri uri) {
        DataSource.Factory dataSourceFactory =
                new DefaultDataSourceFactory(this, "point5-live");
        return new ProgressiveMediaSource.Factory(dataSourceFactory)
                .createMediaSource(uri);
    }

    private void updateStartPosition() {
        if (player != null) {
            playWhenReady = player.getPlayWhenReady();
            currentWindow = player.getCurrentWindowIndex();
            playbackPosition = Math.max(0, player.getContentPosition());
        }
    }

    private void clearStartPosition() {
        playWhenReady = true;
        currentWindow = C.INDEX_UNSET;
        playbackPosition = C.TIME_UNSET;
    }

    private void releasePlayer() {
        if (player != null) {
            Log.d("ALFONSO", "Position on release :" + String.valueOf(player.getCurrentPosition()));
            //updateStartPosition();
            player.stop();
            player.release();
            player = null;
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        releasePlayer();
    }

    @Override
    public void onStart() {
        super.onStart();
        initializePlayer();
    }

    @Override
    public void onResume() {
        super.onResume();
        //initializePlayer();
    }

    @Override
    public boolean onGenericMotionEvent(MotionEvent event) {
        Log.d("ALFONSO", "Test this : " + String.valueOf(event));
        return true;
    }

    @SuppressLint("InlinedApi")
    private void hideSystemUi() {
        playerView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == 23) { // select
            playerView.showController();
        }
        return super.onKeyDown(keyCode, event);
    }


    private class PlaybackStateListener implements Player.EventListener {
        @Override
        public void onPlayerStateChanged(boolean playWhenReady,
                                         int playbackState) {
            Context context = getApplicationContext();
            String stateString;
            Toast toast;
            switch (playbackState) {
                case ExoPlayer.STATE_IDLE:
                    stateString = "ExoPlayer.STATE_IDLE      -";
                    break;
                case ExoPlayer.STATE_BUFFERING:
                    stateString = "ExoPlayer.STATE_BUFFERING -";
                    toast = Toast.makeText(context, "Loading", Toast.LENGTH_SHORT);
                    toast.show();
                    TrackSelectionArray selections = player.getCurrentTrackSelections();
                    Log.d("ALFONSO_PLAYERx2", player.getCurrentTrackGroups().toString());
                    break;
                case ExoPlayer.STATE_READY:
                    stateString = "ExoPlayer.STATE_READY     -";
                    break;
                case ExoPlayer.STATE_ENDED:
                    stateString = "ExoPlayer.STATE_ENDED     -";
                    toast = Toast.makeText(context, "Finished", Toast.LENGTH_SHORT);
                    toast.show();
                    Handler handler = new Handler();
                    handler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            getParent().finish();
                        }
                    }, 1000);
                    break;
                default:
                    stateString = "UNKNOWN_STATE             -";
                    break;
            }
            Log.d("TAG", "changed state to " + stateString
                    + " playWhenReady: " + playWhenReady);
        }
    }
}
