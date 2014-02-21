angular.module('rummyApp')
  .controller('DeckDiscardsController', ['$scope', 'Utilities', 'Adapter', function($scope, Utilities, Adapter) {
    $scope.cards = Adapter.game.discardPile()._cards;
    $scope.imageName = Utilities.imagePath;

    $scope.draw = function() {
      if (Adapter.game.turn() == 1) {
        Adapter.game.draw();
      }
    }
  }]);