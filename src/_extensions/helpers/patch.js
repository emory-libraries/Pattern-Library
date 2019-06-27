// Load dependencies.
const _ = require('lodash');

// Simulate a storage.
const storage = {};

// Export helpers.
module.exports = {

  // This patches the missing helpers that will be available
  // within the templating engine, but will not be available
  // within Pattern Lab. This is needed in order to let
  // Pattern Lab fail gracefully when attempting to use these
  // helpers.
  API: () => null,
  storageSet( key, value ) {

    _.set(storage, key, value);

  },
  storagePush( key, value ) {

    _.set(storage, key, _.concat(_.get(storage, key, []), value));

  },
  storageUnshift( key, value ) {

    _.set(storage, key, _.concat(value, _.get(storage, key, [])));

  },
  storageGet( key ) {

    const value = _.get(storage, key);

    _.unset(storage, key);

    return value;

  },

};
