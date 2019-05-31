// Load dependencies.
const _ = require('lodash');
const cast = require('../utils/cast.js');

// Export helpers.
module.exports = {

  // Set a key-value pair on a given context.
  set( key, value, context ) {

    _.set(context, key, value);

  },

  // Unset a key-value pair on a given context.
  unset( key, context ) {

    _.unset(context, key);

  },

  // Make an object or array.
  make( key, context, options ) {

    // Get arguments.
    const args = Array.from(arguments);

    // Get the options and context.
    options = _.last(args);
    context = args.length == 3 ? context : this;

    // Get the content.
    let content = options.fn(this).trim();

    // Create the object or array.
    context[key] = cast(content);

  },

  // Assign a value to the current context.
  assign( key, value ) {

    _.set(this, key, value);

  },

  // Unassign a value to the current context.
  unassign( key ) {

    _.unset(this, key);

  }

};
