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

RummyView.prototype.updateOpponentHand = function() {
  var cardCount = this.game.player(2).cards().length;
  var cardList = $("#opponent-hand");
  cardList.find('li').remove();
  for(var i = 0; i < cardCount; i++) {
    var li = $('<li><img src="images/cards/backs_blue.png"/></li>');
    cardList.append(li);
  }
};

RummyView.prototype.updateHand = function() {
  var cardsList = $("#hand");
  cardsList.find('li').remove();
  var hand = this.hand();
  hand.forEach(function(card, index) {
    var li = $('<li data-index="' + index + '"><img src="images/cards/' + imageName(card) + '"/></li>');
    li.click(this, function(clickEvent) {
      clickEvent.data.game.discard($(this).data('index'));
      clickEvent.data.updateView();
      clickEvent.data.displayDiscardPile();
    });
    cardsList.append(li);
  }, this);
};

RummyView.prototype.updateDeck = function() {
  var deckSection = $(".deck-discard");
  if (deckSection.find('.deck').length == 0) {
    var deck = $('<img></img>');
    deck.addClass('deck');
    deck.attr('src', 'images/cards/backs_blue.png');
    deck.click(this, function(clickEvent) {
      clickEvent.data.game.draw();
      clickEvent.data.updateView();
    });
    deckSection.append(deck)
  }
}

RummyView.prototype.updateDiscardPile = function() {
  var discardPileSection = $(".deck-discard");
  discardPileSection.find('ul').remove();
  var discardPileList = $('<ul class="discard"></ul>');
  
  var cards = this.discardPile().cards();
  this.displayCards(cards, discardPileList);
  
  discardPileSection.append(discardPileList);
};

RummyView.prototype.updateView = function() {
  this.updateOpponentHand();
  this.updateDeck();
  this.updateDiscardPile();
  this.updateHand();
};

$(document).ready(function() {
  var view = new RummyView(1);
  view.updateView();
});