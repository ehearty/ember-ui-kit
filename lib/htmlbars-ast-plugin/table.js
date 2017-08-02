module.exports = function recursiveTransform(syntax, builders, node) {
  syntax.traverse(node, {
    BlockStatement: function(node) {
    }
  });
};

