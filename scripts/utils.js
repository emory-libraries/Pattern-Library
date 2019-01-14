// Load dependencies.
const path = require('path');
const fs = require('fs-extra');
  
// Find and load all utility methods.
const utils = fs.readdirSync(path.resolve('scripts/utils')).reduce((result, util) => {
    
    // Load the utility method.
    result[path.basename(util, path.extname(util))] = require(path.resolve('scripts/utils', util));
      
    // Continue.
    return result;
    
  }, {});

// Export our utilities.
module.exports = utils;