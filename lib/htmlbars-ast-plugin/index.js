let form = require('./form');

function ComponentTransform() {
  this.syntax = null;
}

ComponentTransform.prototype.transform = function(ast) {
  form(this.syntax, this.syntax.builders, ast);

  return ast;
};

module.exports = ComponentTransform;
