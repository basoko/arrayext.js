// Generated by CoffeeScript 1.4.0

Array.prototype.isArray = true;

Array.isArray = function(elem) {
  if (elem.isArray != null) {
    return true;
  } else {
    return false;
  }
};

Array.prototype.add = function(elem) {
  if (this.indexOf(elem) === -1) {
    this.push(elem);
  }
  return this.length;
};

Array.prototype.copy = function() {
  return this.concat();
};

Array.prototype.hasList = function(list) {
  return "TODO";
};

Array.prototype.remove = function(position) {
  return "TODO";
};

Array.prototype.deduct = function(list) {
  return "TODO";
};

Array.prototype.merge = function(list) {
  return "TODO";
};
