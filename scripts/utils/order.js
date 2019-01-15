// Extracts the ordering of our patterns.
module.exports = function( group, subgroup = null, pattern = true ) {
  
  // Load dependencies.
  const path = require('path');
  const _ = require('lodash');
  const glob = require('glob').sync;
  const fs = _.extend(require('fs-extra'), {
    readdirSyncRecursive: require('fs-readdir-recursive')
  });

  // Load configurations.
  const config = require('../../patternlab-config.json');
  
  // Get the atomic structure of patterns.
  const atomic = require(path.resolve(__dirname, 'atomic.js'))();
  
  // Get group and subgroup directory.
  let groupDir = Object.keys(atomic).indexOf(group) > -1 ? `${atomic[group]}-${group}` : group;
  let subgroupDir = '';
  
  // Get subgroups if applicable.
  if( subgroup ) {
    
    // Get subgroups.
    const groups = require(path.resolve(__dirname, 'groups.js'))(group);
    
    // Find subgroup directory.
    subgroupDir = Object.keys(groups).includes(subgroup) ? `${groups[subgroup]}-${subgroup}` : subgroup;
    
  }

  // Extract the order numbers.
  return glob(path.resolve(config.paths.source.patterns, groupDir, subgroupDir, '*')).filter((dir) => {
    
    // Get the path in question.
    const src = path.resolve(config.paths.source.patterns, dir);
    
    // Ignore non-patterns if pattern.
    if( pattern ) {
      
      // Ignore non-files.
      if( fs.existsSync(src) && !fs.statSync(src).isFile() ) return false;
      
      // Ignore non-patterns.
      return path.extname(src) === `.${config.patternExtension}`;
      
    }
    
    // Otherwise, ignore non-directories if directory.
    return fs.existsSync(src) && fs.statSync(src).isDirectory();
    
  }).reduce((result, src) => {
    
    // Extract the file or folder number and name.
    const ext = path.extname(src);
    const number = +path.basename(src, ext).replace(/^(\d*?)-.*$/, '$1');
    const name = path.basename(src, ext).replace(/^(\d*?)-/, '');

    // Save the number and name.
    result.push({
      src,
      number: _.isNaN(number) ? null : _.pad(number, 2, 0),
      name
    });
    
    // Continue.
    return result;
    
  }, []);
  
};