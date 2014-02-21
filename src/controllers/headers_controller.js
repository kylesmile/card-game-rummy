angular.module('rummyApp')
  .controller('HeadersController', ['$scope', 'Adapter', function($scope, Adapter) {
    $scope.saveGame = function() {
      Adapter.saveGame(function(error, response, data) {
        if (error) {
          alert("Unable to save game");
        } else {
          alert("You might need this later: " + response._data.uuid);
        }
      });
    }

    $scope.loadGame = function() {
      var uuid = prompt("Enter the game id");
      Adapter.loadGame(uuid, function(error, entity, data) {
        if (error) {
          alert("Unable to load game");
        }
      });
    }
  }]);