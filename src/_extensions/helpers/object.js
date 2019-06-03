// Load dependencies.
const _ = require('lodash');

// Export helpers.
module.exports = {

  // Get object keys.
  keys: ( object ) => Object.keys(object),

  // Get object values.
  values: ( object ) => Object.values(object),

  // Convert sets of key-value pairs to objects.
  objectify( options ) {

    // Return the options hash as an object.
    return _.get(options, 'hash', {});

  }

};
