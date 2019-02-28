// Load dependencies.
const utils = require('handlebars-utils');
const moment = require('moment');
const date = require('date.js');

// Export helpers.
module.exports = {

  // Get a datetime object from a string date.
  datetime( string, options ) {

    // Set options.
    options = utils.context(this, {
      datejs: true
    }, options);

    // Return datetime object.
    return options.datejs ? moment(date(string)) : moment(new Date(string));

  }

};
