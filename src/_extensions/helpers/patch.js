// Load dependencies.
const _ = require('lodash');

// Export helpers.
module.exports = {

  // This patches the missing helpers that will be available
  // within the templating engine, but will not be available
  // within Pattern Lab. This is needed in order to let
  // Pattern Lab fail gracefully when attempting to use these
  // helpers.
  API: () => null,
  storageSet: () => null,
  storagePush: () => null,
  storageUnshift: () => null,
  storageGet( key ) { return _.get(this, key); },

};
