function RummyView(playerNumber) {
  this.game = new RummyGame(2);
  this.player = playerNumber;
  this.bot = new RummyBot(this.game);
}

RummyView.prototype.cardImage = function(imageName) {
  var img = $('<img>');
  img.attr('src', 'images/cards/' + imageName);
  return img;
}

RummyView.prototype.cardInLI = function(imageName) {
  var li = $('<li>');
  li.append(this.cardImage(imageName));
  return li;
}

RummyView.prototype.imageName = function(card) {
  return card.suit().toLowerCase() + card.rank().toLowerCase() + ".png";
}

RummyView.prototype.botTurn = function() {
  window.setTimeout(function(view) {
    view.bot.takeTurn();
    view.updateView();
  }, 500, this);
}

RummyView.prototype.hand = function() {
  return this.game.player(this.player).cards();
}

RummyView.prototype.discardPile = function() {
  return this.game.discardPile();
}

RummyView.prototype.displayCards = function(cards, element) {
  cards.forEach(function(card) {
    var li = this.cardInLI(this.imageName(card));
    element.append(li);
  }, this);
}

RummyView.prototype.updateOpponentHand = function() {
  var cardCount = this.game.player(2).cards().length;
  var cardList = $("#opponent-hand");
  cardList.empty();
  for(var i = 0; i < cardCount; i++) {
    var li = this.cardInLI('backs_blue.png');
    cardList.append(li);
  }
}

RummyView.prototype.updateHand = function() {
  var cardsList = $("#hand");
  cardsList.empty();
  var hand = this.hand();
  hand.forEach(function(card, index) {
    var li = $('<li>');
    var image = this.cardImage(this.imageName(card));
    li.append(image);
    image.click(this, function(clickEvent) {
      var view = clickEvent.data;
      if (view.game.turn() == view.player) {
        if ($(this).hasClass('selected')) {
          view.game.deselectCard(index);
        } else {
          view.game.selectCard(index);
        }
        view.updateView();
      }
    });
    if (this.game.selectedIndices.some(function(selectedIndex) { return selectedIndex == index })) {
      image.addClass('selected');
    }
    cardsList.append(li);
  }, this);
}

RummyView.prototype.updateDeck = function() {
  var deckSection = $(".deck-discard");
  if (deckSection.find('.deck').length == 0) {
    var deck = this.cardImage('backs_blue.png');
    deck.addClass('deck');
    deck.click(this, function(clickEvent) {
      var view = clickEvent.data;
      if (view.game.turn() == view.player) {
        view.game.draw();
        view.updateView();
      }
    });
    deckSection.append(deck);
  }
}

RummyView.prototype.button = function(text, id, disabled, onclick) {
  var button = $('<a>');
  button.attr('id', id);
  button.addClass('button');
  button.text(text);
  if (disabled) button.addClass('disabled');
  button.click(this, onclick);
  return button;
}

RummyView.prototype.meldButton = function() {
  var meldButton = this.button('Meld', 'meld-button', !this.game.canMeldSelected(), function(clickEvent) {
    var view = clickEvent.data;
    view.game.meldSelected();
    view.updateView();
  });
  return meldButton;
}

RummyView.prototype.discardButton = function() {
  var discardButton = this.button('Discard', 'discard-button', !this.game.canDiscardSelected(), function(clickEvent) {
    var view = clickEvent.data;
    view.game.discard();
    view.updateView();
    view.botTurn();
  });
  return discardButton;
}

RummyView.prototype.updateButtons = function() {
  var turnSection = $('.turn');
  turnSection.empty();
  var discardButton = this.discardButton();
  var meldButton = this.meldButton();
  turnSection.append(discardButton);
  turnSection.append(meldButton);
}

RummyView.prototype.updateDiscardPile = function() {
  var discardPileSection = $(".deck-discard");
  discardPileSection.find('.discard').remove();
  var discardPileList = $('<ul>')
  discardPileList.addClass('discard');
  
  var cards = this.discardPile().cards();
  this.displayCards(cards, discardPileList);
  
  discardPileSection.append(discardPileList);
}

RummyView.prototype.updatePlayerMelds = function() {
  var meldsUL = $("#player-melds").find(".melds");
  meldsUL.empty();
  
  this.game.player(1).melds().forEach(function(meld) {
    var meldLI = $('<li>');
    var meldUL = $('<ul>');
    meldUL.addClass('meld');
    meldLI.append(meldUL);
    this.displayCards(meld.cards(), meldUL);
    meldsUL.append(meldUL);
  }, this);
}

RummyView.prototype.updateView = function() {
  this.updateOpponentHand();
  this.updateDeck();
  this.updateDiscardPile();
  this.updatePlayerMelds();
  this.updateHand();
  this.updateButtons();
}

$(document).ready(function() {
  var view = new RummyView(1);
  view.updateView();
});