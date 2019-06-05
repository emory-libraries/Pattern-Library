// Load helpers.
const _ = require('lodash');
const glob = require('glob').sync;
const fs = require('fs-extra');
const path = require('path');

// Load configurations.
const config = require(path.resolve('./patternlab-config.json'));

// Load all helpers.
const helpers = glob(path.resolve(__dirname, 'helpers/*.js')).map((helper) => {

  // Load the helpers.
  return require(helper);

}).reduce((result, helper) => {

  // Combine all helpers.
  result = _.extend(result, helper);

  // Continue.
  return result;

}, {});

// Export helpers.
module.exports = (engine) => {

  return _.extend(
    require('handlebars-helpers')(),
    require('handlebars-layouts')(engine),
    helpers
  );

};
