// Load dependencies.
const glob = require('glob').sync;
const path = require('path');
const _ = require('lodash');

// Load helpers.
const helpers = _.extend(require('handlebars-helpers')(), glob(path.resolve(__dirname, '!(passthrough).js')).map((helper) => {

  // Load the helpers.
  return require(helper);

}).reduce((result, helper) => {

  // Combine all helpers.
  result = _.extend(result, helper);

  // Continue.
  return result;

}, {}));

// Initialize passthrough helper.
passthrough = ( data, passthroughs, recursive ) => {

  // Set passthrough recursion if not set.
  if( !_.isBoolean(recursive) ) recursive = true;

  // Initialize the result.
  let result = data;

  // Enable passthrough of all items within a data set.
  if( _.isArray(data) && recursive ) {

    // Passthrough all array values.
    result = data.map((item) => passthrough(item, passthroughs, recursive));

  }

  // Otherwise, enable passthrough of a single data item.
  else {

    // Get binding data.
    const bind = _.reduce(data, (bind, value, key) => {

      // Get bind property.
      bind[`:${key}`] = value;

      // Continue.
      return bind;

    }, {});

    // Merge all passthrough data.
    _.each(passthroughs, (calls, key) => {

      // Pass the data through the helpers.
      _.each(calls, (arguments, helper) => {

        // Ignore invalid helpers.
        if( !helpers[helper] ) return;

        // Bind argumets.
        arguments = arguments.map((argument) => bind[argument] || argument);

        // Passthrough helpers.
        _.set(result, key, helpers[helper](...arguments));

      });

    });

  }

  // Return the result.
  return result;

};

// Export helpers.
module.exports = {

  passthrough

};
