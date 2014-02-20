var rummyApp = angular.module('rummyApp', []);
var adapter = new GameApigeeAdapter();
adapter.setUp();
var bot = new RummyBot(adapter.game);

rummyApp.imageName = function(card) {
  var imageName = card.suit().toLowerCase() + card.rank().toLowerCase() + ".png";
  return 'images/cards/' + imageName;
};

rummyApp.controller('HeaderController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.saveGame = function() {
    adapter.saveGame(function(error, response, data) {
      if (error) {
        alert("Unable to save game");
      } else {
        alert("You might need this later: " + response._data.uuid);
      }
    });
  }

  $scope.loadGame = function() {
    var uuid = prompt("Enter the game id");
    adapter.loadGame(uuid, function(error, entity, data) {
      if (error) {
        alert("This game is broken. :(");
      }
    });
  }
}]);

rummyApp.controller('PlayerHandController', ['$scope', function($scope) {
  $scope.hand = adapter.game.player(1).cards();

  $scope.imageName = rummyApp.imageName;

  $scope.isSelected = function(index) {
    return adapter.game.selectedIndices.indexOf(index) > -1;
  }

  $scope.toggleSelection = function(index) {
    if ($scope.isSelected(index)) {
      adapter.game.deselectCard(index);
    } else {
      adapter.game.selectCard(index);
    }
  }
}]);

rummyApp.controller('BotHandController', ['$scope', function($scope) {
  $scope.hand = adapter.game.player(2)._cards;
}]);

rummyApp.controller('DeckDiscardController', ['$scope', function($scope) {
  $scope.cards = adapter.game.discardPile()._cards;
  $scope.imageName = rummyApp.imageName;

  $scope.draw = function() {
    if (adapter.game.turn() == 1) {
      adapter.game.draw();
    }
  }
}]);

rummyApp.controller('MeldController', ['$scope', function($scope) {
  $scope.melds = adapter.game.player(1)._melds;
  $scope.imageName = rummyApp.imageName;
}]);

rummyApp.controller('TurnController', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.discard = function() {
    adapter.game.discard();
    $scope.botTurn();
  }

  $scope.meld = function() {
    adapter.game.meldSelected();
  }

  $scope.validDiscard = function() {
    return adapter.game.canDiscardSelected();
  }

  $scope.validMeld = function() {
    return adapter.game.canMeldSelected();
  }

  $scope.botTurn = function() {
    $timeout(function() {
      bot.takeTurn();
    }, 500);
  }
}]);