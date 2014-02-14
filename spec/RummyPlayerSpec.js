describe("RummyPlayer", function() {
  var player;
  var threeOfHearts;
  var jackOfDiamonds;
  var aceOfSpades;
  
  beforeEach(function() {
    player = new RummyPlayer;
    threeOfHearts = new RummyCard("3", "H");
    jackOfDiamonds = new RummyCard("J", "D");
    aceOfSpades = new RummyCard("A", "S");
  });
  
  it("can take cards", function() {
    player.takeCard(aceOfSpades);
    
    expect(player.cards()[0]).toBe(aceOfSpades);
    
    player.takeCards([jackOfDiamonds, threeOfHearts]);
    
    expect(player.cards()[1]).toBe(threeOfHearts);
    expect(player.cards()[2]).toBe(jackOfDiamonds);
  });
  
  it("can play cards", function() {
    player.takeCards([aceOfSpades, jackOfDiamonds, threeOfHearts]);
    
    var card = player.play(1);
    expect(card).toEqual(threeOfHearts);
    expect(player.cards().length).toBe(2);
    card = player.play(1);
    expect(card).toEqual(jackOfDiamonds);
    expect(player.cards().length).toBe(1);
  });
  
  it("sorts its cards", function() {
    var sevenOfClubs = new RummyCard("7", "H");
    var kingOfClubs = new RummyCard("K", "C");
    player.takeCards([kingOfClubs, jackOfDiamonds, threeOfHearts, sevenOfClubs]);
    player.takeCard(aceOfSpades);
    var cards = player.cards();
    expect(cards[0]).toBe(aceOfSpades);
    expect(cards[1]).toBe(threeOfHearts);
    expect(cards[2]).toBe(sevenOfClubs);
    expect(cards[3]).toBe(jackOfDiamonds);
    expect(cards[4]).toBe(kingOfClubs);
  });
});