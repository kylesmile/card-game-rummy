describe("RummyDiscardPile", function() {
  it("can take discards", function() {
    var discardPile = new RummyDiscardPile;
    
    var aceOfSpades = new RummyCard("A", "S");
    var jackOfDiamonds = new RummyCard("J", "D");
    var twoOfHearts = new RummyCard("2", "H");
    
    discardPile.discard(aceOfSpades);
    expect(discardPile.size()).toBe(1);
    
    discardPile.discard(jackOfDiamonds);
    discardPile.discard(twoOfHearts);
    expect(discardPile.size()).toBe(3);
    
    expect(discardPile.cards()).toEqual([aceOfSpades, jackOfDiamonds, twoOfHearts]);
  });
});