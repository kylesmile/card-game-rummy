describe("CardDeck", function() {
  var deck;
  
  beforeEach(function() {
    deck = new CardDeck;
  });
  
  it("starts with 52 cards", function() {
    expect(deck.size()).toEqual(52);
  });
  
  // it("can be shuffled", function() {
  //   var shuffledDeck = new CardDeck;
  //   shuffledDeck.shuffle();
    
  //   var i;
    
  //   for (i = 0; i < 52; i++) {
  //     if(deck._cards[i].rank() != shuffledDeck._cards[i].rank() && deck._cards[i].suit() != shuffledDeck._cards[i].suit()) {
  //       break;
  //     }
  //   }
    
  //   console.log(deck);
    
  //   expect(i).toBeLessThan(52);
  // });
});