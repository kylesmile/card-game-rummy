describe("RummyBot", function() {
  it("can take an automated turn", function() {
    var game = new RummyGame;
    var bot = new RummyBot(game);
    
    expect(game.turn()).toBe(1);
    
    bot.takeTurn();
    
    expect(game.turn()).toBe(2);
    expect(game.discardPile().size()).toBe(2);
  }); 
});