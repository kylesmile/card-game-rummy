function RummyView(playerNumber) {
  this.game = new RummyGame(2);
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
  cardsList.find('li').remove();
  var hand = this.hand();
  hand.forEach(function(card, index) {
    var li = $('<li data-index="' + index + '"><img src="images/cards/' + imageName(card) + '"/></li>');
    li.click(this, function(clickEvent) {
      clickEvent.data.game.discard($(this).data('index'));
      clickEvent.data.displayHand();
      clickEvent.data.displayDiscardPile();
    });
    cardsList.append(li);
  }, this);
};

RummyView.prototype.displayDeck = function() {
  var deckSection = $(".deck-discard");
  var deck = $('<img></img>');
  deck.addClass('deck');
  deck.attr('src', 'images/cards/backs_blue.png');
  deck.click(this, function(clickEvent) {
    clickEvent.data.game.draw();
    clickEvent.data.displayHand();
  });
  deckSection.append(deck)
}

RummyView.prototype.displayDiscardPile = function() {
  var discardPileSection = $(".deck-discard");
  discardPileSection.find('ul').remove();
  var discardPileList = $('<ul class="discard"></ul>');
  
  var cards = this.discardPile().cards();
  this.displayCards(cards, discardPileList);
  
  discardPileSection.append(discardPileList);
};

$(document).ready(function() {
  var view = new RummyView(1);
  view.displayHand();
  view.displayDeck();
  view.displayDiscardPile();
});