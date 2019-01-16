// Initialize the export method.
module.exports = function ( ...patterns ) {

  // Load dependencies.
  const path = require('path');
  const patternlab = require('patternlab-node');
  const _ = require('lodash');
  const fs = _.extend(require('fs-extra'), {
    readdirSyncRecursive: require('fs-readdir-recursive')
  });
  const glob = require('glob').sync;
  const intercept = require('intercept-stdout');
  const utils = require('./utils.js');
  
  // Start interceptor to prevent Pattern Lab from writing to the console.
  const unhook = intercept();

  // Load configurations.
  const config = require('../patternlab-config.json');
  
  // Get the atomic group names and numbers of our folders.
  const groups = utils.atomic(); 
 
  // By default, if no pattern is given, export all patterns.
  if( patterns.length === 0 ) patterns.push('*');
  
  // Get pattern arguments.
  patterns = _.castArray(patterns).map((pattern) => {
    
    // Handle asterisks.
    if( pattern === '*' ) return path.resolve(config.paths.public.patterns, pattern);
    
    // Otherwise, get the pattern's meta data.
    const atomic = /^\d*?-/.test(pattern) ? '' : groups[pattern.split('-')[0]] + '-';
    const group = /^\d*?-/.test(pattern) ? pattern.split('-')[1] : pattern.split('-')[0];
    const name = _.trim(pattern.replace(atomic, '').replace(group, ''), '-');

    // Get the pattern's path.
    return path.resolve(config.paths.public.patterns, atomic + group + '*' + '-' + name);
    
  });

  // Build the patterns.
  patternlab(config).patternsonly(() => {
    
    // Stop intercepting console output.
    unhook();
    
    // Initialize a list of exported patterns.
    const exported = [];
    
    // Export all patterns.
    patterns.forEach((pattern) => { 

      // Find all compiled patterns.
      glob(pattern).forEach((pattern) => { 
        
        // Ensure that the pattern exists.
        if( fs.existsSync(pattern) ) {
          
          // Copy all patterns to the export folder.
          fs.copySync(pattern, path.resolve(config.patternExportDirectory, path.basename(pattern)));
          
          // Save the exported pattern name.
          exported.push(path.basename(pattern));
          
        }

      });
      
    });
    
    // Find all asset files.
    const assets = fs.readdirSyncRecursive(path.resolve(config.paths.source.patterns)).map((asset) => {
      
      // Get data about the asset.
      const ext = path.extname(asset);
      const id = asset.replace(/\//g, '-').replace(ext, '');
      
      // Save the asset data.
      return {
        asset,
        ext,
        id,
        src: path.resolve(config.paths.source.patterns, asset),
        dest: path.resolve(config.patternExportDirectory, id, `${id}${ext}`)
      };
      
    }).filter((asset) => {
      
      // Ignore template, data, and markdown files.
      if( [`.${config.patternExtension}`, '.json', '.md'].includes(asset.ext) ) return false;

      // Also, ignore any patterns that were not exported.
      if( !exported.includes(asset.id) ) return false;
      
      // Otherwise, assume it's an asset file.
      return true;
      
    });

    // Export pattern assets.
    assets.forEach((asset) => fs.copySync(asset.src, asset.dest));
    
    // Report done.
    console.log('Patterns exported successfully.');

  }, true);
  
};