angular.module('rummyApp')
  .controller('TurnsController', ['$scope', '$timeout', 'Adapter', function($scope, $timeout, Adapter) {
    $scope.discard = function() {
      Adapter.game.discard();
      $scope.botTurn();
    }

    $scope.meld = function() {
      Adapter.game.meldSelected();
    }

    $scope.validDiscard = function() {
      return Adapter.game.canDiscardSelected();
    }

    $scope.validMeld = function() {
      return Adapter.game.canMeldSelected();
    }

    $scope.botTurn = function() {
      $timeout(function() {
        Adapter.bot.takeTurn();
      }, 500);
    }
  }]);