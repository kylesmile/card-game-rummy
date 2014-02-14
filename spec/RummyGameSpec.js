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
    
    expect(game.canDiscardSelected()).toBe(false);
    
    game.selectCard(0);
    expect(game.canDiscardSelected()).toBe(false);
    
    game.discard();
    expect(game.discardPile().size()).toBe(1);
    expect(game.player(1).cards().length).toBe(7);
    expect(game.turn()).toBe(1);
    
    game.draw();
    expect(game.canDiscardSelected()).toBe(true);
    
    game.selectCard(1);
    expect(game.canDiscardSelected()).toBe(false);
    
    game.deselectCard(1);
    expect(game.canDiscardSelected()).toBe(true);
    
    expect(game.player(1).cards().length).toBe(8);
    game.discard();
    expect(game.discardPile().size()).toBe(2);
    expect(game.player(1).cards().length).toBe(7);
    expect(game.turn()).toBe(2);
    expect(game.selectedIndices.length).toBe(0);
  });
  
  it("properly handles turn order", function() {
    expect(game.turn()).toBe(1);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.selectCard(0);
    game.discard();
    
    expect(game.turn()).toBe(2);
    expect(game._hasDrawn).toBe(false);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.selectCard(0);
    game.discard();
    
    expect(game.turn()).toBe(3);
    expect(game._hasDrawn).toBe(false);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.selectCard(0);
    game.discard();
    
    expect(game.turn()).toBe(4);
    expect(game._hasDrawn).toBe(false);
    game.draw();
    expect(game._hasDrawn).toBe(true);
    game.selectCard(0);
    game.discard();
    
    expect(game.turn()).toBe(1);
    expect(game._hasDrawn).toBe(false);
  });
  
  it("knows if a new meld is valid", function() {
    var aceOfSpades = new RummyCard("A", "S");
    var aceOfDiamonds = new RummyCard("A", "D");
    var aceOfHearts = new RummyCard("A", "H");
    var twoOfSpades = new RummyCard("2", "S");
    var threeOfSpades = new RummyCard("3", "S");
    
    game.player(1)._cards = [];
    game.player(1).takeCards([aceOfSpades, aceOfDiamonds, aceOfHearts, twoOfSpades, threeOfSpades]);
    
    expect(game.canMeldSelected()).toBe(false);
    
    game.selectCard(0);
    game.selectCard(1);
    game.selectCard(2);
    
    expect(game.canMeldSelected()).toBe(true);
    
    game.selectCard(3);
    
    expect(game.canMeldSelected()).toBe(false);
    
    game.deselectCard(0);
    game.deselectCard(1);
    game.deselectCard(2);
    game.deselectCard(3);
    
    game.selectCard(0);
    game.selectCard(3);
    game.selectCard(4);
    
    expect(game.canMeldSelected()).toBe(true);
    
    game.selectCard(1);
    
    expect(game.canMeldSelected()).toBe(false);
  });
});