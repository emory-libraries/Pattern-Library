// Load dependencies.
const path = require('path');
const _ = require('lodash');

// Load configurations.
const config = require(path.resolve('patternlab-config.json'));

// Get the current environment.
const ENV = process.env.NODE_ENV;

// Set base URL for each environment.
const BASE_URL = {
  development:  path.join('/', path.basename(process.cwd()), config.paths.public.root),
  production:   config.paths.live.pathname
};

// Export helpers.
module.exports = {

  // Determine the base URL based on the environment.
  baseUrl: () => _.trimEnd(ENV ? BASE_URL[ENV] : '', '/')

};
