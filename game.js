var game = {
  init: function init() {
    console.log('init');

    var host = location.origin.replace(/^http/, 'ws');
    // local testing
    if (host.indexOf('file') !== -1) {
      host = 'ws://lit-bayou-23750.herokuapp.com';
    }
    var ws = null;

    var performers = [];
    var viewers = [];
    var clients = [];
    
    var $startButton = $('#startButton').on('click', function(e) {
      if(!$startButton.hasClass('disabled')) {
        console.log('begin game');
        // signal the server to begin a new game
        var startSignal = {
          round: -1
        }
        ws.send(JSON.stringify(startSignal));
        $startButton.addClass('disabled');
      }
    });

    $(function() {
      ws = new WebSocket(host);
      ws.onopen = function(event) {
        console.log('connected');
        $startButton.removeClass('disabled');
      };
      ws.onclose = function(event) {
        console.log('disconnected');
      };
      ws.onerror = function(event) {
        console.log('something went wrong' + event);
      };
      ws.onmessage = function(event) {
        console.log(event.data);
        var data = JSON.parse(event.data);
        var i = 0;
        // if we're being sent the quarter then it's the start of a new game
        if(typeof data.quarter !== 'undefined') {
          // populate player hand on screen
          $('.player.row').find('.card-title').each(function() {
            if(i < data.playerhand.length) {
              var $this = $(this);
              $this.text(data.playerhand[i].ticker);
              $this.siblings('.stock-name').text(data.playerhand[i].name);
              $this.siblings('.stock-industry').text(data.playerhand[i].industry);
              $this.siblings('.stock-price').text(data.playerhand[i].price);
              i++;
            }
          });
        }
      };
    });
  }
}
