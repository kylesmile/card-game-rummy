function RummyBot(game) {
  this._game = game;
}

RummyBot.prototype.game = function() {
  return this._game;
};

RummyBot.prototype.takeTurn = function() {
  this.game().draw();
  this.game().discard(0);
};