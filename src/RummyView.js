function RummyView(playerNumber) {
  this.game = new RummyGame;
  this.player = playerNumber;
}

RummyView.prototype.hand = function() {
  return this.game.player(this.player).cards;
};

window.onload = function() {
  var view = new RummyView(1);
  var cardsList = document.getElementById("hand");
  
  var hand = view.hand();
  
  hand.forEach(function(card) {
    var li = document.createElement("li");
    li.innerText = card.rank() + "-" + card.suit();
    cardsList.appendChild(li);
  });
}