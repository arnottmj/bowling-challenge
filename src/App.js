$(document).ready(function() {
  
  var frame1 = new Frame();
  var frame2 = new Frame();
  var frame3 = new Frame();
  var frame4 = new Frame();
  var frame5 = new Frame();
  var frame6 = new Frame();
  var frame7 = new Frame();
  var frame8 = new Frame();
  var frame9 = new Frame();
  var frame10 = new TenthFrame();

  var frameArray = [frame1, frame2, frame3, frame4, frame5, frame6, frame7, frame8, frame9, frame10];

  var selector = 0;
  var data = '';

  var game = new Game(frameArray[selector]);

  var content = [];
  $("#score").show();
  $("#frame").hide();
  $("#game").hide();


  showField();

  function showField() { 
    if (game.isComplete()) {
      $("#score").hide();
      $("#game").show();
    } 
    else if (game.currentFrame().isInProgress()) {
      $("#frame").hide();
      $("#score").show();
    } 
    else {
      $("#score").hide();
      $("#frame").show();
    };
  }

  function generateTable() { 
    
    game.frameRecord.forEach(function(frame){
      data += '(Frame ' + (selector + 1).toString() +') ';

      data += 'First Roll: ' + game.currentFrame().scoreRecord[0].toString() + ', ';
      debugger;
      if (game.currentFrame().scoreRecord[1]) {
        data += 'Second Roll: ' + game.currentFrame().scoreRecord[1].toString() + ', ';
      };

      if (game.currentFrame().scoreRecord[2]) {
        data += 'Third Roll: ' + game.currentFrame().scoreRecord[2].toString() + ', ';
      };

      data += 'Total score with bonus: ' + game.currentFrame().totalScoreWithBonus().toString() + '<br>';
    });

    content.push(data);
    $("#table").html(data);
  };


  $("#nextframe").click(function() {
    game.calculateBonuses();
    selector ++;
    game.newFrame(frameArray[selector]);
    showField();
  });

  $("#submitscore").click(function() {
    var input = $('#inputscore').val();
    game.currentFrame().roll(parseInt(input));  
    showField();
    generateTable();
  });
});


