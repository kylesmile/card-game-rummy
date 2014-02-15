function RummyPlayer() {
  this._cards = [];
  this._melds = [];
}

RummyPlayer.prototype.cards = function() {
  return this._cards;
}

RummyPlayer.prototype.melds = function() {
  return this._melds;
}

RummyPlayer.prototype.takeCard = function(card) {
  this.cards().push(card);
  this.sortCards()
}

RummyPlayer.prototype.takeCards = function(cards) {
  this.cards().push.apply(this.cards(), cards);
  this.sortCards();
}

RummyPlayer.prototype.sortCards = function() {
  this.cards().sort(function(card1, card2) {
    if (card1.order() < card2.order()) return -1;
    if (card1.order() > card2.order()) return 1;
    return 0;
  });
}

RummyPlayer.prototype.play = function(cardIndex) {
  return this.cards().splice(cardIndex, 1)[0];
}

RummyPlayer.prototype.meldIndices = function(indices) {
  var meldedCards = this.cards().reduce(function(selectedCards, card, index) {
    if (indices.indexOf(index) > -1) selectedCards.push(card);
    return selectedCards;
  }, []);
    
  this._cards = this.cards().filter(function(card, index) {
    return indices.indexOf(index) == -1;
  });
  
  var meld = new RummyMeld;
  meld.meld(meldedCards);
  
  this.melds().push(meld);  
}