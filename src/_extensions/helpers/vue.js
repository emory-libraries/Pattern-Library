// Load dependencies.
const _ = require('lodash');
const stringHelpers = require('./string.js');

// Export helpers.
const helpers = {

  // Get the base variable name of the Vue string.
  vueBase: ( str ) => stringHelpers.trimSubstringEnd(stringHelpers.trimSubstringStart(str, '<%'), '%>').trim(),

  // Get a conditional expression based on a Vue variable.
  vueCondition( str ) {

    // Convert the Vue variable to an array.
    const arr = helpers.vueBase(str).split('.');

    // Initialize the expression.
    let expr = arr[0];

    // Build the conditional expression.
    for( let i = 1; i < arr.length; i++ ) {

      // Get all keys in the array up until this point.
      const keys = arr.slice(0, i + 1);

      // Continue to build the expression.
      expr += ` && ${keys.join('.')}`;

    }

    // Return the expression.
    return expr;

  }

};

// Export helpers.
module.exports = helpers;
