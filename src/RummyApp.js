rummyApp = angular.module('rummyApp', []);

rummyApp.game = new RummyGame(2);
rummyApp.bot = new RummyBot(rummyApp.game);

rummyApp.imageName = function(card) {
  var imageName = card.suit().toLowerCase() + card.rank().toLowerCase() + ".png";
  return 'images/cards/' + imageName;
}

rummyApp.controller('PlayerHandController', ['$scope', function($scope) {
  $scope.hand = rummyApp.game.player(1).cards();
  
  $scope.imageName = rummyApp.imageName;
  
  $scope.isSelected = function(index) {
    return rummyApp.game.selectedIndices.indexOf(index) > -1;
  }
  
  $scope.toggleSelection = function(index) {
    if ($scope.isSelected(index)) {
      rummyApp.game.deselectCard(index);
    } else {
      rummyApp.game.selectCard(index);
    }
  }
}]);

rummyApp.controller('BotHandController', ['$scope', function($scope) {
  $scope.hand = rummyApp.game.player(2)._cards;
}]);

rummyApp.controller('DeckDiscardController', ['$scope', function($scope) {
  $scope.cards = rummyApp.game.discardPile()._cards;
  $scope.imageName = rummyApp.imageName;
  
  $scope.draw = function() {
    if (rummyApp.game.turn() == 1) {
      rummyApp.game.draw();
    }
  }
}]);

rummyApp.controller('MeldController', ['$scope', function($scope) {
  $scope.melds = rummyApp.game.player(1)._melds;
  $scope.imageName = rummyApp.imageName;
}]);

rummyApp.controller('TurnController', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.discard = function() {
    rummyApp.game.discard();
    $scope.botTurn();
  }
  
  $scope.meld = function() {
    rummyApp.game.meldSelected();
  }
  
  $scope.validDiscard = function() {
    return rummyApp.game.canDiscardSelected();
  }
  
  $scope.validMeld = function() {
    return rummyApp.game.canMeldSelected();
  }
  
  $scope.botTurn = function() {
    $timeout(function() {
      rummyApp.bot.takeTurn();
    }, 500);
  }
}]);