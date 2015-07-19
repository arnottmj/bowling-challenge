var Game = function(firstFrame) {
  this.frameRecord = [firstFrame];
};

Game.prototype.overallScore = function(frame) {
  var total = 0;
  this.frameRecord.forEach(function(frame){
    total = total + frame.totalScoreWithBonus();
  });
  return total;
};

Game.prototype.isComplete = function() {
  return (this.frameRecord.length == 10 && !this.currentFrame().isInProgress());
};

Game.prototype.newFrame = function(frame) {
  if (!this.currentFrame().isInProgress()) {
    this.frameRecord.push(frame);
  };
};

Game.prototype.calculateBonuses = function() {
  if (!this.currentFrame().isInProgress()) {
    this.bonusForSpare();
    this.bonusForStrike();
    this.bonusForStrikeStrike();
    this.bonusForStrikeStrikeStrike();
  };
};

Game.prototype.bonusForSpare = function(first_argument) {
  if (this.previousFrame() && this.previousFrame().isSpare()) {
    this.previousFrame().scoreBonus.push(this.currentFrame().scoreRecord[0]);
  };
};

Game.prototype.bonusForStrike = function(first_argument) {
  if (this.previousFrame() && this.previousFrame().isStrike() && !this.currentFrame().isStrike()) {
    this.previousFrame().scoreBonus.push(this.currentFrame().totalScore());
  };
};

Game.prototype.bonusForStrikeStrike = function(first_argument) {
  if (this.frameBeforeLast() && this.frameBeforeLast().isStrike() && this.previousFrame().isStrike() && !this.currentFrame().isStrike()) {
    this.frameBeforeLast().scoreBonus.push(this.currentFrame().scoreRecord[0]);
    this.frameBeforeLast().scoreBonus.push(this.previousFrame().totalScore());
  };
};

Game.prototype.bonusForStrikeStrikeStrike = function(first_argument) {
  if (this.frameBeforeLast() && this.frameBeforeLast().isStrike() && this.previousFrame().isStrike() && this.currentFrame().isStrike()) {
    this.frameBeforeLast().scoreBonus.push(this.currentFrame().totalScore());
    this.frameBeforeLast().scoreBonus.push(this.previousFrame().totalScore());
  };
};

Game.prototype.currentFrame = function() {
  return this.frameRecord.slice(-1)[0];
};

Game.prototype.previousFrame = function() {
  if (this.frameRecord.length > 1) {
    return this.frameRecord.slice(-2)[0];
  };
};

Game.prototype.frameBeforeLast = function() {
  if (this.frameRecord.length > 2) {
    return this.frameRecord.slice(-3)[0];
  };
};


