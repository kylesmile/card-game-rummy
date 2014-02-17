Object.prototype.toJSON = function() {
  this.className = this.constructor.name;
  return this;
}

Object.fromJSON = function(json) {
  var object = JSON.parse(json, function(key, value) {
    if (value.className) {
      value.__proto__ = window[value.className].prototype;
    }
    return value;
  });
  return object;
}