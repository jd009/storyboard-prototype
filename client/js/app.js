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
    playerVars: {
      controls: 0,
      showinfo: 0
    },
    events: {
      'onReady': storyStateMachine.onPlayer1Ready.bind(storyStateMachine),
      'onStateChange': storyStateMachine.frame1StateListener.bind(storyStateMachine)
    }
    }
  );

  player2 = new YT.Player('player2', {
    height: VIDEO_HEIGHT,
    width: VIDEO_WIDTH,
    playerVars: {
      controls: 0,
      showinfo: 0
    },
    events: {
      'onReady': storyStateMachine.onPlayer2Ready.bind(storyStateMachine),
      'onStateChange': storyStateMachine.frame2StateListener.bind(storyStateMachine)
    }
    }
  );

  player3 = new YT.Player('player3', {
    height: VIDEO_HEIGHT,
    width: VIDEO_WIDTH,
    playerVars: {
      controls: 0,
      showinfo: 0
    },
    events: {
      'onReady': storyStateMachine.onPlayer3Ready.bind(storyStateMachine),
      'onStateChange': storyStateMachine.frame3StateListener.bind(storyStateMachine)
    }
    }
  );
}

function StoryStateMachine(){
  this.frame1StateListener = function(event){
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
        player2.playVideo();
        break;
      case YT.PlayerState.BUFFERING:
        state = 'buffering';
        break;
      case YT.PlayerState.CUED:
        state = 'cued';
        break;
    }
    console.log('Frame 1');
    console.log('Current url: ' + event.target.B.videoUrl);
    console.log('Current State: ' + state);
  };

  this.frame2StateListener = function(event){
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
        player3.playVideo();
        break;
      case YT.PlayerState.BUFFERING:
        state = 'buffering';
        break;
      case YT.PlayerState.CUED:
        state = 'cued';
        break;
    }
    console.log('Frame 2');
    console.log('Current url: ' + event.target.B.videoUrl);
    console.log('Current State: ' + state);
  };

  this.frame3StateListener = function(event){
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
        break;
      case YT.PlayerState.BUFFERING:
        state = 'buffering';
        break;
      case YT.PlayerState.CUED:
        state = 'cued';
        break;
    }
    console.log('Frame 3');
    console.log('Current url: ' + event.target.B.videoUrl);
    console.log('Current State: ' + state);
  };

  this.onPlayer1Ready = function(event){
    event.target.loadVideoById(
      {
        'videoId': '8lXdyD2Yzls', //gopher
        'startSeconds': 0,
        'endSeconds': 4
      }
    );
  }

  this.onPlayer2Ready = function(event){
    event.target.cueVideoById(
      {
        'videoId': '3GJOVPjhXMY', //star wars kid
        'startSeconds': 9,
        'endSeconds': 14
      }
    );
  }

  this.onPlayer3Ready = function(event){
    event.target.cueVideoById(
      {
        'videoId': '-5x5OXfe9KY', //dancing baby
        'startSeconds': 3,
        'endSeconds': 7
      }
    );
  }
}

