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
    var li = $("<li>" + card.rank() + "-" + card.suit() + "</li>");
    element.append(li);
  });
};

RummyView.prototype.displayHand = function() {
  var cardsList = $("#hand");
  var hand = this.hand();
  this.displayCards(hand, cardsList);
};

RummyView.prototype.displayDiscardPile = function() {
  var discardPileList = $("#discard");
  discardPileList.innerText = "";
  
  var cards = this.discardPile().cards();
  this.displayCards(cards, discardPileList);
};

$(document).ready(function() {
  var view = new RummyView(1);
  view.displayHand();
  view.displayDiscardPile();
});