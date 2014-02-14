function RummyPlayer() {
  this._cards = [];
}

RummyPlayer.prototype.cards = function() {
  return this._cards;
}

RummyPlayer.prototype.takeCard = function(card) {
  this.cards().push(card);
  this.sortCards()
};

RummyPlayer.prototype.takeCards = function(cards) {
  this.cards().push.apply(this.cards(), cards);
  this.sortCards();
};

RummyPlayer.prototype.sortCards = function() {
  this.cards().sort(function(card1, card2) {
    if (card1.order() < card2.order()) return -1;
    if (card1.order() > card2.order()) return 1;
    return 0;
  });
}

RummyPlayer.prototype.play = function(cardIndex) {
  var playedCard = this.cards()[cardIndex];
  this._cards = this.cards().filter(function(card) {return card != playedCard})
  return playedCard;
};