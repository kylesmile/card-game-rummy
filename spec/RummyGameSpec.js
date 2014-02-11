describe("RummyGame", function() {
  var game;
  
  beforeEach(function() {
    game = new RummyGame;
  });
  
  it("has a deck", function() {
    expect(game.deck()).toBeAKindOf(CardDeck);
    expect(game.deck().size()).toEqual(23)
  });
  
  it("has players", function() {
    var game1 = new RummyGame(2);
    var game2 = new RummyGame(3);
    
    expect(game1._players.length).toEqual(2);
    expect(game2._players.length).toEqual(3);
    expect(game._players.length).toEqual(4);
    expect(game1.player(1)).toBeAKindOf(RummyPlayer);
    expect(game.player(1).cards.length).toEqual(7);
  }); 
  
  it("has a discard pile", function() {
    expect(game.discardPile()).toBeAKindOf(RummyDiscardPile);
    expect(game.discardPile().size()).toEqual(1);
  });
});