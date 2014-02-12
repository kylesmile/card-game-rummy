function RummyView(playerNumber) {
  this.game = new RummyGame;
  this.player = playerNumber;
}

RummyView.prototype.hand = function() {
  return this.game.player(this.player).cards;
};

RummyView.prototype.discardPile = function() {
  return this.game.discardPile();
};

RummyView.prototype.displayCards = function(cards, element) {
  cards.forEach(function(card) {
    var li = document.createElement("li");
    li.innerText = card.rank() + "-" + card.suit();
    element.appendChild(li);
  });
};

RummyView.prototype.displayHand = function() {
  var cardsList = document.getElementById("hand");
  var hand = this.hand();
  this.displayCards(hand, cardsList);
};

RummyView.prototype.displayDiscardPile = function() {
  var discardPileList = document.getElementById("discard");
  discardPileList.innerText = "";
  
  var cards = this.discardPile().cards();
  this.displayCards(cards, discardPileList);
};

window.onload = function() {
  var view = new RummyView(1);
  view.displayHand();
  view.displayDiscardPile();
}