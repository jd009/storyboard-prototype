var player1;
var player2;
var player3;

function onYouTubeIframeAPIReady() {
  player1 = new YT.Player('player1', {
    height: '200',
    width: '356',
    videoId: '8lXdyD2Yzls',  //gopher
    playerVars: {
      controls: 0,
      showinfo: 0
    },
    // events: {
    //   'onReady': loadVideo,
    //   'onStateChange': stateListener
    // }
    }
  );

  player2 = new YT.Player('player2', {
    height: '200',
    width: '356',
    videoId: '3GJOVPjhXMY', //star wars kid
    playerVars: {
      controls: 0,
      showinfo: 0
    },
    // events: {
    //   'onReady': loadVideo,
    //   'onStateChange': stateListener
    // }
    }
  );

  player3 = new YT.Player('player3', {
    height: '200',
    width: '356',
    videoId: '-5x5OXfe9KY', //dancing baby
    playerVars: {
      controls: 0,
      showinfo: 0
    },
    // events: {
    //   'onReady': loadVideo,
    //   'onStateChange': stateListener
    // }
    }
  );
}

function StoryStateMachine(){
  
}

