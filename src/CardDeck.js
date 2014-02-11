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
  var tempCard, index;
  
  for (var i = 0; i < this._cards.length; i++) {
    index = Math.floor(Math.random() * this._cards.length);
    tempCard = this._cards[i];
    this._cards[i] = this._cards[index];
    this._cards[index] = tempCard;
  }
}

CardDeck.prototype.draw = function() {
  return this._cards.pop();
}