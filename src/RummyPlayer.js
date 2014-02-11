function RummyPlayer() {
  this.cards = [];
}

RummyPlayer.prototype.takeCard = function(card) {
  this.cards.push(card);
};

RummyPlayer.prototype.takeCards = function(cards) {
  this.cards.push.apply(this.cards, cards);
};