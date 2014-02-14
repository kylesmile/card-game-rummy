describe("RummyGame", function() {
  var game;
  
  beforeEach(function() {
    game = new RummyGame;
  });
  
  it("has a deck", function() {
    expect(game.deck()).toBeAKindOf(CardDeck);
    expect(game.deck().size()).toBe(23)
  });
  
  it("has players", function() {
    var game1 = new RummyGame(2);
    var game2 = new RummyGame(3);
    
    expect(game1._players.length).toBe(2);
    expect(game2._players.length).toBe(3);
    expect(game._players.length).toBe(4);
    for (var i = 1; i <= 4; i++) {
      expect(game.player(i)).toBeAKindOf(RummyPlayer);
      expect(game.player(i).cards().length).toBe(7);
    }
  }); 
  
  it("has a discard pile", function() {
    expect(game.discardPile()).toBeAKindOf(RummyDiscardPile);
    expect(game.discardPile().size()).toBe(1);
  });
  
  it("allows drawing cards", function() {
    game.draw();
    expect(game.player(1).cards().length).toBe(8);
    game.draw();
    expect(game.player(1).cards().length).toBe(8);
  });
  
  it("allows discarding cards", function() {
    expect(game.turn()).toBe(1);
    game.discard(0);
    expect(game.discardPile().size()).toBe(1);
    expect(game.player(1).cards().length).toBe(7);
    expect(game.turn()).toBe(1);
    
    game.draw();
    expect(game.player(1).cards().length).toBe(8);
    game.discard(0);
    expect(game.discardPile().size()).toBe(2);
    expect(game.player(1).cards().length).toBe(7);
    expect(game.turn()).toBe(2);
  });
  
  it("properly handles turn order", function() {
    expect(game.turn()).toBe(1);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.discard(0);
    
    expect(game.turn()).toBe(2);
    expect(game._hasDrawn).toBe(false);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.discard(0);
    
    expect(game.turn()).toBe(3);
    expect(game._hasDrawn).toBe(false);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.discard(0);
    
    expect(game.turn()).toBe(4);
    expect(game._hasDrawn).toBe(false);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.discard(0);
    
    expect(game.turn()).toBe(1);
    expect(game._hasDrawn).toBe(false);
  });
});