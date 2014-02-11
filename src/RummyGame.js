function RummyGame(playerCount) {
  playerCount = playerCount || 4;
  
  this._deck = new CardDeck;
  this._players = [];
  this._discardPile = new RummyDiscardPile;
  
  for (var i = 0; i < playerCount; i++) {
    this._players.push(new RummyPlayer);
  }
    
  for (var i = 0; i < 7; i++) {
    for (var player = 0; player < playerCount; player++) {
      this._players[player].takeCard(this._deck.draw())
    }
  }
  
  this._discardPile.discard(this._deck.draw());
}

RummyGame.prototype.deck = function() {
  return this._deck;
};

RummyGame.prototype.discardPile = function() {
  return this._discardPile;
};

RummyGame.prototype.player = function(number) {
  return this._players[number - 1];
};