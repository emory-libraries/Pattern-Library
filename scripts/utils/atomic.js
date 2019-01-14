// Extracts the atomic structure of our patterns.
module.exports = function() {
  
  // Load dependencies.
  const path = require('path');
  const _ = require('lodash');
  const fs = _.extend(require('fs-extra'), {
    readdirSyncRecursive: require('fs-readdir-recursive')
  });

  // Load configurations.
  const config = require('../../patternlab-config.json');
  
  // Extract the atomic structure.
  return fs.readdirSync(path.resolve(config.paths.source.patterns)).filter((dir) => {
    
    // Get the path in question.
    const src = path.resolve(config.paths.source.patterns, dir);
    
    // Ignore non-directories.
    return fs.existsSync(src) && fs.statSync(src).isDirectory();
    
  }).reduce((result, dir) => {
    
    // Extract the folder's number and name.
    const number = _.pad(+dir.replace(/^(\d*?)-.*$/, '$1'), 2, 0);
    const name = dir.replace(/^(\d*?)-/, '');

    // Save the number and name.
    result[name] = number || '';
    
    // Continue.
    return result;
    
  }, {});
  
};