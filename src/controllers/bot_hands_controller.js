angular.module('rummyApp')
  .controller('BotHandsController', ['$scope', 'Adapter', function($scope, Adapter) {
    $scope.hand = Adapter.game.player(2)._cards;
  }]);