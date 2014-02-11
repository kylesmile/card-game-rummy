describe("RummyCard", function() {
  it("Has a rank and a suit", function() {
    var card = new RummyCard("A", "S");
    expect(card.rank()).toEqual("A");
    expect(card.suit()).toEqual("S");
  });
  
  it("knows its ordering value", function() {
    var card1 = new RummyCard("A", "S");
    var card2 = new RummyCard("2", "H");
    var card3 = new RummyCard("10", "D");
    var card4 = new RummyCard("K", "C");
    
    expect(card1.order()).toEqual(0);
    expect(card2.order()).toEqual(1);
    expect(card3.order()).toEqual(9);
    expect(card4.order()).toEqual(12);
  });
  
  it("knows its point value", function() {
    var two = new RummyCard("2", "C");
    var nine = new RummyCard("9", "D");
    var ten = new RummyCard("10", "S");
    var king = new RummyCard("K", "H");
    var ace = new RummyCard("A", "S");
    
    expect(two.points()).toEqual(5);
    expect(nine.points()).toEqual(5);
    expect(ten.points()).toEqual(10);
    expect(king.points()).toEqual(10);
    expect(ace.points()).toEqual(15);
  });
});