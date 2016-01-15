var VIDEO_HEIGHT = 200;
var VIDEO_WIDTH = 356;

function Frame(playerDiv, videoId, start, end){
  this.player = null;
  this.playerDiv = playerDiv;
  this.videoId = videoId;
  this.start = start;
  this.end = end;
}

var story = {
  frames: []
};

var FRAME1 = 0;
var FRAME2 = 1;
var FRAME3 = 2;
var frame1 = new Frame('player1', '8lXdyD2Yzls', 0, 2);
story.frames[FRAME1] = frame1;
var frame2 = new Frame('player2', '3GJOVPjhXMY', 9, 14);
story.frames[FRAME2] = frame2;
var frame3 = new Frame('player3', '-5x5OXfe9KY', 3, 7);
story.frames[FRAME3] = frame3;

var storyStateMachine = new StoryStateMachine(story);

function onYouTubeIframeAPIReady() {
  var storyFrames = story.frames;
  for(var i = 0; i < storyFrames.length; i++){
    storyFrames[i].player =
      new YT.Player(
        storyFrames[i].playerDiv,
        {
          height: VIDEO_HEIGHT,
          width: VIDEO_WIDTH,
          videoId: storyFrames[i].videoId,
          playerVars: {
            controls: 0,
            showinfo: 0,
            start: storyFrames[i].start,
            end: storyFrames[i].end
          },
          events: {
            'onReady': storyStateMachine.onPlayerReady.bind(storyStateMachine),
            'onStateChange': storyStateMachine.playerStateListener.bind(storyStateMachine)
          }
        }
      );
  }
}

function StoryStateMachine(story){
  this.story = story;

  this.playerStateListener = function(event){
    var state;
    switch(event.data){
      case -1:
        state = 'unstarted';
        break;
      case YT.PlayerState.ENDED:
        state = 'ended';
        break;
      case YT.PlayerState.PLAYING:
        state = 'playing';
        break;
      case YT.PlayerState.PAUSED:
        state = 'paused';
        this.playNextVideo(event);
        this.recueCurrentVideo(event);
        break;
      case YT.PlayerState.BUFFERING:
        state = 'buffering';
        break;
      case YT.PlayerState.CUED:
        state = 'cued';
        break;
    }
    var playerDivId = event.target.f.id;
    console.log(playerDivId);
    console.log('Current url: ' + event.target.B.videoUrl);
    console.log('Current State: ' + state);
  };

  this.playNextVideo = function(event){
    var pausedPlayerDivId = event.target.f.id;
    switch(pausedPlayerDivId){
      case 'player1':
        this.story.frames[FRAME2].player.playVideo();
        break;
      case 'player2':
        this.story.frames[FRAME3].player.playVideo();
        break;
      case 'player3':
        break;
    }
  }

  this.recueCurrentVideo = function(event){
    var currentVideoInfo = event.target.h.h;
    var currentVideoId = currentVideoInfo.videoId;
    var currentVideoStart = currentVideoInfo.playerVars.start;
    var currentVideoEnd = currentVideoInfo.playerVars.end;
    event.target.cueVideoById(
      {
        'videoId': currentVideoId,
        'startSeconds': currentVideoStart,
        'endSeconds': currentVideoEnd
      }
    );
  }

  this.onPlayerReady = function(event){
    var readyPlayer = event.target;
    var readyPlayerDivId = event.target.f.id;
    switch(readyPlayerDivId){
      case 'player1':
        readyPlayer.playVideo();
        break;
      case 'player2':
      case 'player3':
        readyPlayer.playVideo();
        readyPlayer.pauseVideo();
        break;
    }
  }
}

