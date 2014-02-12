function RummyView(playerNumber) {
  this.game = new RummyGame;
  this.player = playerNumber;
}

function imageName(card) {
  return card.suit().toLowerCase() + card.rank().toLowerCase() + ".png";
};

RummyView.prototype.hand = function() {
  return this.game.player(this.player).cards();
};

RummyView.prototype.discardPile = function() {
  return this.game.discardPile();
};

RummyView.prototype.displayCards = function(cards, element) {
  cards.forEach(function(card) {
    var li = $('<li><img src="images/cards/' + imageName(card) + '"/></li>');
    element.append(li);
  });
};

RummyView.prototype.displayHand = function() {
  var cardsList = $("#hand");
  var hand = this.hand();
  this.displayCards(hand, cardsList);
};

RummyView.prototype.displayDeck = function() {
  var deckSection = $(".deck-discard");
  deckSection.append('<img class="deck" src="images/cards/backs_blue.png"/>')
}

RummyView.prototype.displayDiscardPile = function() {
  var discardPileList = $(".deck-discard").append('<ul class="discard"></ul>').find('ul');
  
  var cards = this.discardPile().cards();
  this.displayCards(cards, discardPileList);
};

$(document).ready(function() {
  var view = new RummyView(1);
  view.displayHand();
  view.displayDeck();
  view.displayDiscardPile();
});