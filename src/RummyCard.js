var RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var SUITS = ["S", "C", "D", "H"];

function RummyCard(rank, suit) {
  this._rank = rank;
  this._suit = suit;
}

RummyCard.prototype.rank = function() {
  return this._rank;
};

RummyCard.prototype.suit = function() {
  return this._suit;
}

RummyCard.prototype.order = function() {
  return RANKS.indexOf(this.rank());
}

RummyCard.prototype.points = function() {
  var order = this.order();
  if (order == 0) return 15;
  if (order < 9) return 5;
  return 10;
}