function RummyGame(playerCount) {
  this._playerCount = playerCount || 4;
  
  this._deck = new CardDeck;
  this._deck.shuffle();
  this._players = [];
  this._discardPile = new RummyDiscardPile;
  this._hasDrawn = false;
  this._turn = 1;
  
  for (var i = 0; i < this._playerCount; i++) {
    this._players.push(new RummyPlayer);
  }
    
  for (var i = 0; i < 7; i++) {
    this._players.forEach(function(player) {
      player.takeCard(this._deck.draw());
    }, this);
  }
  
  this._discardPile.discard(this._deck.draw());
}

RummyGame.prototype.playerCount = function() {
  return this._playerCount;
};

RummyGame.prototype.deck = function() {
  return this._deck;
};

RummyGame.prototype.discardPile = function() {
  return this._discardPile;
};

RummyGame.prototype.player = function(number) {
  return this._players[number - 1];
};

RummyGame.prototype.turn = function() {
  return this._turn;
};

RummyGame.prototype.currentPlayer = function() {
  return this.player(this.turn());
};

RummyGame.prototype.draw = function() {
  if (!this._hasDrawn) {
    this.player(1).takeCard(this.deck().draw());
    this._hasDrawn = true;
  }
};

RummyGame.prototype.discard = function(cardIndex) {
  if (this._hasDrawn) {
    var playedCard = this.currentPlayer().play(cardIndex);
    this.discardPile().discard(playedCard);
    this._turn = this.turn() + 1 % this.playerCount();
  }
};