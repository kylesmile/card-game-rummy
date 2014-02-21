angular.module('rummyApp')
  .controller('PlayerHandsController', ['$scope', 'Utilities', 'Adapter', function($scope, Utilities, Adapter) {
    $scope.hand = Adapter.game.player(1).cards();

    $scope.imageName = Utilities.imagePath;

    $scope.isSelected = function(index) {
      return Adapter.game.selectedIndices.indexOf(index) > -1;
    }

    $scope.toggleSelection = function(index) {
      if ($scope.isSelected(index)) {
        Adapter.game.deselectCard(index);
      } else {
        Adapter.game.selectCard(index);
      }
    }
  }]);