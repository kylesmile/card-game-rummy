angular.module('rummyApp')
  .service('Adapter', [function() {
    var Adapter = function() {
      this.game = new RummyGame(2);
      this.bot = new RummyBot(this.game);
      var clientCredentials = {
        orgName:'kylesmile',
        appName:'rummy'
      };
      this.apigeeClient = new Apigee.Client(clientCredentials);
      this.apigeeClient.login('Everyone', 'Password1', function(error, response) {
        if (error) {
          alert("Unable to connect to server");
        }
      });
    };

    Adapter.prototype.saveGame = function(callback) {
      var requestProperties = {
        type:'game',
        game:JSON.stringify(this.game)
      }

      this.apigeeClient.createEntity(requestProperties, callback);
    };

    Adapter.prototype.loadGame = function(uuid, callback) {
      var requestProperties = {
        type:'game',
        uuid:uuid
      }

      this.apigeeClient.getEntity(requestProperties, function(error, entity, data) {
        // Update game
        var loadedGame = Object.fromJSON(entity._data.game);

        this.game.player(1).cards().splice(0);
        this.game.player(1).melds().splice(0);
        this.game.player(2).cards().splice(0);
        this.game.player(2).melds().splice(0);
        this.game.deck()._cards.splice(0);
        this.game.discardPile().cards().splice(0);
        this.game.selectedIndices.splice(0);

        this.game.player(1).takeCards(loadedGame.player(1).cards());
        this.game.player(2).takeCards(loadedGame.player(2).cards());

        this.game.player(1).melds().push.apply(this.game.player(1).melds(), loadedGame.player(1).melds());
        this.game.player(2).melds().push.apply(this.game.player(2).melds(), loadedGame.player(2).melds());

        this.game.deck()._cards.push.apply(this.game.deck()._cards, loadedGame.deck()._cards);
        this.game.discardPile().cards().push.apply(this.game.discardPile().cards(), loadedGame.discardPile().cards());
        this.game.selectedIndices.push.apply(this.game.selectedIndices, loadedGame.selectedIndices);

        this.game._hasDrawn = loadedGame._hasDrawn;
        this.game._turn = loadedGame.turn();

        callback(error, entity, data);
      }.bind(this));
    };

    return new Adapter;
  }]);