function RummyPlayer() {
  this._cards = [];
}

RummyPlayer.prototype.cards = function() {
  return this._cards;
}

RummyPlayer.prototype.takeCard = function(card) {
  this.cards().push(card);
};

RummyPlayer.prototype.takeCards = function(cards) {
  this.cards().push.apply(this.cards(), cards);
};

RummyPlayer.prototype.play = function(cardIndex) {
  var playedCard = this.cards()[cardIndex];
  this._cards = this.cards().filter(function(card) {return card != playedCard})
  return playedCard;
};