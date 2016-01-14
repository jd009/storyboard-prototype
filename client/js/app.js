var VIDEO_HEIGHT = 200;
var VIDEO_WIDTH = 356;
var player1;
var player2;
var player3;
var storyStateMachine = new StoryStateMachine();

function onYouTubeIframeAPIReady() {
  player1 = new YT.Player('player1', {
    height: VIDEO_HEIGHT,
    width: VIDEO_WIDTH,
    videoId: '8lXdyD2Yzls', //gopher
    playerVars: {
      controls: 0,
      showinfo: 0,
      start: 0,
      end: 2
    },
    events: {
      'onReady': storyStateMachine.onPlayer1Ready.bind(storyStateMachine),
      'onStateChange': storyStateMachine.playerStateListener.bind(storyStateMachine)
    }
    }
  );

  player2 = new YT.Player('player2', {
    height: VIDEO_HEIGHT,
    width: VIDEO_WIDTH,
    videoId: '3GJOVPjhXMY', //star wars kid
    playerVars: {
      controls: 0,
      showinfo: 0,
      start: 9,
      end: 14
    },
    events: {
      'onReady': storyStateMachine.onPlayerReady.bind(storyStateMachine),
      'onStateChange': storyStateMachine.playerStateListener.bind(storyStateMachine)
    }
    }
  );

  player3 = new YT.Player('player3', {
    height: VIDEO_HEIGHT,
    width: VIDEO_WIDTH,
    videoId: '-5x5OXfe9KY', //baby
    playerVars: {
      controls: 0,
      showinfo: 0,
      start: 3,
      end: 7
    },
    events: {
      'onReady': storyStateMachine.onPlayerReady.bind(storyStateMachine),
      'onStateChange': storyStateMachine.playerStateListener.bind(storyStateMachine)
    }
    }
  );
}

function StoryStateMachine(){
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
    var pausedPlayer = event.target.f.id;
    switch(pausedPlayer){
      case 'player1':
        player2.playVideo();
        break;
      case 'player2':
        player3.playVideo();
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

  this.onPlayer1Ready = function(event){
    event.target.playVideo();
  }

  this.onPlayerReady = function(event){
    event.target.playVideo();
    event.target.pauseVideo();
  }
}

