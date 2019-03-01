// Load dependencies.
const _  = require('lodash');

// Initialize extensions.
module.exports = (engine) => {

  // Load extensions.
  const helpers = require('./_helpers.js')(engine);
  const partials = require('./_partials.js');

  // Load helpers.
  _.forIn(helpers, (helper, name) => {

    if( _.isFunction(helper) ) engine.registerHelper(name, helper);

  });

  // Load partials.
  _.forIn(partials, (partial, name) => {

    if( !_.isNil(partial) ) engine.registerPartial(name, partial);

  });

  // Done.
  return engine;

};
