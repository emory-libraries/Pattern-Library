// Load dependencies.
const _ = require('lodash');
const cast = require('../utils/cast.js');

// Export helpers.
module.exports = {
  
  // Set a key-value pair on a given context.
  set( key, value, context ) {
    
    context[key] = value;
    
  },
  
  // Unset a key-value pair on a given context.
  unset( key, context ) {
    
    delete context[key];
    
  },
  
  // Make an object or array.
  make( key, context, options ) {
    
    // Get the content.
    let content = options.fn(this).trim();

    // Create the object or array.
    context[key] = cast(content);
    
  }
  
};