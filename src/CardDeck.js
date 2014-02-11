function CardDeck() {
  this._cards = [];
  for (var rank = 0; rank < 13; rank++) {
    for (var suit = 0; suit < 4; suit++) {
      this._cards.push(new RummyCard(RANKS[rank], SUITS[suit]));
    }
  }
}

CardDeck.prototype.size = function() {
  return this._cards.length;
}

CardDeck.prototype.shuffle = function() {
  
}