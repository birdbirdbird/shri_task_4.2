module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Array.map instead of lodash _.map',
    },
    fixable: 'true'
  },
  create: function (context) {
    return {
      CallExpression(node) {
        if (node.callee.object.name === '_' && node.callee.property.name === 'map' ) {
          const collection = node.arguments[0];
          const scope = context.getScope(node);
          const c = scope.set.get(collection.name)
          if ((collection.type === 'ArrayExpression') || 
          (collection.type !== 'ObjectExpression' && 
          collection.type !== 'Literal' && 
          c.defs[0].node.init.type === 'ArrayExpression')) { 
            context.report({
              node,
              message: 'It is better to use native Array.map instead of lodash _.map',
              fix: function(fixer) {
                const sourseCode = context.getSourceCode();
                const arr = sourseCode.getText(node.arguments[0]);
                const fn = sourseCode.getText(node.arguments[1]);
                return fixer.replaceText(node, `${arr}.map(${fn})`); 
              }
            });
          }
        }
      }
    }
  }
};
  