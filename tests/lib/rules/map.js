
const rule = require('../../../lib/rules/map');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();
ruleTester.run('map', rule, {

  valid: [
    "var qwe = 'sdsfsdf'; \
            _.map(qwe, fn);",
    "_.map('sdsfsdf', fn);"
  ],

  invalid: [
    {
      code: 'var qwe = [1,2,3]; _.map(qwe, fn);',
      errors: [{
        message: 'It is better to use native Array.map instead of lodash _.map'
      }],
      output: 'var qwe = [1,2,3]; qwe.map(fn);',
    },
    {
      code: '_.map([1,2,3], fn);',
      errors: [{
        message: 'It is better to use native Array.map instead of lodash _.map'
      }],
      output: '[1,2,3].map(fn);',
    }
  ]
});