describe("RummyPlayer", function() {
  it("can take cards", function() {
    var player = new RummyPlayer;
    var aceOfSpades = new RummyCard("A", "S")
    player.takeCard(aceOfSpades);
    
    expect(player.cards()[0]).toBe(aceOfSpades);
    
    var jackOfDiamonds = new RummyCard("J", "D");
    var threeOfHearts = new RummyCard("3", "H");
    
    player.takeCards([jackOfDiamonds, threeOfHearts]);
    
    expect(player.cards()[1]).toBe(jackOfDiamonds);
    expect(player.cards()[2]).toBe(threeOfHearts);
  });
  
  it("can play cards", function() {
    var player = new RummyPlayer;
    var aceOfSpades = new RummyCard("A", "S");
    var jackOfDiamonds = new RummyCard("J", "D");
    var threeOfHearts = new RummyCard("3", "H");
    player.takeCards([aceOfSpades, jackOfDiamonds, threeOfHearts]);
    
    var card = player.play(1);
    expect(card).toEqual(jackOfDiamonds);
    expect(player.cards().length).toBe(2);
    card = player.play(1);
    expect(card).toEqual(threeOfHearts);
    expect(player.cards().length).toBe(1);
  });
});