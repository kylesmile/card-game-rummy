angular.module('rummyApp')
  .controller('MeldsController', ['$scope', 'Utilities', 'Adapter', function($scope, Utilities, Adapter) {
    $scope.melds = Adapter.game.player(1)._melds;
    $scope.imageName = Utilities.imagePath;
  }]);