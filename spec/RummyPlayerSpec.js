describe("RummyPlayer", function() {
  it("can take cards", function() {
    var player = new RummyPlayer;
    var aceOfSpades = new RummyCard("A", "S")
    player.takeCard(aceOfSpades);
    
    expect(player.cards[0]).toBe(aceOfSpades);
    
    var jackOfDiamonds = new RummyCard("J", "D");
    var threeOfHearts = new RummyCard("3", "H");
    
    player.takeCards([jackOfDiamonds, threeOfHearts]);
    
    expect(player.cards[1]).toBe(jackOfDiamonds);
    expect(player.cards[2]).toBe(threeOfHearts);
  }); 
});