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
  
  describe("with meldable cards", function() {
    var aceOfHearts, twoOfHearts, jackOfSpades, jackOfClubs;
    
    beforeEach(function() {
      aceOfHearts = new RummyCard("A", "H");
      twoOfHearts = new RummyCard("2", "H");
      jackOfSpades = new RummyCard("J", "S");
      jackOfClubs = new RummyCard("J", "C");
      player.takeCards([aceOfHearts, twoOfHearts, threeOfHearts, jackOfSpades, jackOfDiamonds, jackOfClubs]);
    });
    
    it("keeps track of its melds", function() {
      expect(player.melds().length).toBe(0);
      
      player.meldIndices([0,1,2]);
      
      expect(player.melds().length).toBe(1);
      expect(player.melds()[0].cards()[0]).toBe(aceOfHearts);
      expect(player.melds()[0].cards()[1]).toBe(twoOfHearts);
      expect(player.melds()[0].cards()[2]).toBe(threeOfHearts);
      
      expect(player.cards().length).toBe(3);
      
      player.meldIndices([0,1,2]);
      expect(player.melds()[1].cards()[0]).toBe(jackOfSpades);
      expect(player.melds()[1].cards()[1]).toBe(jackOfDiamonds);
      expect(player.melds()[1].cards()[2]).toBe(jackOfClubs);
      
      expect(player.melds().length).toBe(2);
      expect(player.cards().length).toBe(0);
    });
    
    it("can be JSONified and objectified", function() {
      player.meldIndices([0,1,2]);
      
      var playerJSON = JSON.stringify(player);
      var player2 = Object.fromJSON(playerJSON);
      
      expect(player2).toBeAKindOf(RummyPlayer);
      
      player.cards().forEach(function(card, index) {
        var card2 = player2.cards()[index];
        expect(card2).toBeAKindOf(RummyCard);
        expect(card.rank()).toBe(card2.rank());
        expect(card.suit()).toBe(card2.suit());
      });
      
      player.melds().forEach(function(meld, index) {
        var meld2 = player2.melds()[index];
        meld.cards().forEach(function(card, index) {
          var card2 = meld2.cards()[index];
          expect(card2).toBeAKindOf(RummyCard);
          expect(card.rank()).toBe(card2.rank());
          expect(card.suit()).toBe(card2.suit());
        })
      });
    });
  });
});