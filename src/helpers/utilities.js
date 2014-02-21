angular.module('rummyApp')
  .factory('Utilities', [function() {
    var Utilities = function() {
    };

    Utilities.imagePath = function(card) {
      var imageName = card.suit().toLowerCase() + card.rank().toLowerCase() + ".png";
      return 'images/cards/' + imageName;
    };

    return Utilities;
  }]);