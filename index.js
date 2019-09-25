/**
 * @fileoverview Array.map instead of lodash _.map
 * @author birdbirdbird
 */

module.exports = {
  rules: {
    'lodash-to-native/map': require('./lib/rules/map')
  }
};

