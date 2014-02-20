function GameApigeeAdapter() {
  this.game = new RummyGame(2);
};

GameApigeeAdapter.prototype.setUp = function() {
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

GameApigeeAdapter.prototype.saveGame = function(callback) {
  var requestProperties = {
    type:'game',
    game:JSON.stringify(this.game)
  }
  
  this.apigeeClient.createEntity(requestProperties, callback);
};

GameApigeeAdapter.prototype.loadGame = function(uuid, callback) {
  var requestProperties = {
    type:'game',
    uuid:uuid
  }
  
  this.apigeeClient.getEntity(requestProperties, function(error, entity, data) {
    // Update game
    this.game = Object.fromJSON(entity._data.game);
    callback(error, entity, data);
  }.bind(this));
};