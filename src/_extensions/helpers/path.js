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

// Set domain.
const DOMAIN = _.trimEnd((ENV == 'development' ? 'http' : 'https') + BASE_URL[ENV], '/');

// Export helpers.
module.exports = {

  // Determine the base URL based on the environment.
  baseUrl: () => _.trimEnd(ENV ? BASE_URL[ENV] : '', '/'),

  absolutePath( path ) {

    // Return valid absolute paths as is.
    if( _.startsWith(path, '//') || _.startsWith(path, 'http') ) return path;

    // Otherwise, return the path as an absolute path.
    return DOMAIN + '/' + _.trimStart(path, '/');

  },

  relativePath( path ) {

    // Handle absolute paths.
    if( _.startsWith(path, '//') || _.startsWith(path, 'http') ) {

      // If the path doesn't match the current domain, then use it as is.
      if( path.indexOf(DOMAIN) !== 0 ) return $path;

      // Otherwise, remove the protocol from the path.
      path = path.replace(DOMAIN, '');

    }

    // Return the path as a relative path.
    return _.trimStart(path, '/');

  },

  rootRelativePath( path ) {

    // Handle absolute paths.
    if( _.startsWith(path, '//') || _.startsWith(path, 'http') ) {

      // If the path doesn't match the current domain, then use it as is.
      if( path.indexOf(DOMAIN) !== 0 ) return $path;

      // Otherwise, remove the protocol from the path.
      path = path.replace(DOMAIN, '');

    }

    // Return the path as a root relative path.
    return '/' + _.trimStart(path, '/');

  }

};
