// Extracts the pattern groups within an atomic group.
module.exports = function( group ) {
  
  // Load dependencies.
  const path = require('path');
  const _ = require('lodash');
  const fs = _.extend(require('fs-extra'), {
    readdirSyncRecursive: require('fs-readdir-recursive')
  });

  // Load configurations.
  const config = require('../../patternlab-config.json');
  
  // Get the atomic structure of patterns.
  const atomic = require(path.resolve(__dirname, 'atomic.js'))();
  
  // Get the group directory.
  const groupDir = Object.keys(atomic).includes(group) ? `${atomic[group]}-${group}` : group;
  
  // Extract the atomic structure.
  return fs.readdirSync(path.resolve(config.paths.source.patterns, groupDir)).filter((dir) => {
    
    // Get the path in question.
    const src = path.resolve(config.paths.source.patterns, groupDir, dir);
 
    // Ignore non-directories.
    return fs.existsSync(src) && fs.statSync(src).isDirectory();
    
  }).reduce((result, dir) => { console.log(dir);
    
    // Extract the folder's number and name.
    const number = +dir.replace(/^(\d*?)-.*$/, '$1');
    const name = dir.replace(/^(\d*?)-/, '');

    // Save the number and name.
    result[name] = _.isNaN(number) ? null : _.pad(number, 2, 0);
    
    // Continue.
    return result;
    
  }, {});
  
};