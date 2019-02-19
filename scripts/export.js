// Initialize the export method.
module.exports = function ( pattern = '*' ) {

  // Load dependencies.
  const path = require('path');
  const patternlab = require('patternlab-node');
  const fs = require('fs-extra');
  const glob = require('glob').sync;
  const intercept = require('intercept-stdout');
  const grunt = require('grunt');
  const utils = require('./utils.js');
  const _ = require('lodash');

  // Load configurations.
  const config = require('../patternlab-config.json');
  
  // Get pattern data.
  const patterns = utils.patterns();
 
  // Get patterns to export.
  const exports = pattern == '*' ? Object.values(patterns) : Object.values(patterns).filter((data) => data.pattern.plid == pattern);
  
  // Ignore invalid patterns.
  if( exports.length === 0 ) {
    
    // Report unknown pattern.
    grunt.log.warn(`Unknown pattern '${pattern}'. Verify the pattern exists then try again.`);
    
    // Exit.
    return;
    
  }
  
  // Start interceptor to prevent Pattern Lab from writing to the console.
  const unhook = intercept();

  // Build the patterns.
  patternlab(config).patternsonly(() => {
    
    // Stop intercepting console output.
    unhook();
    
    // Export all patterns.
    exports.forEach((data) => { 
      
      // Set the pattern folder source files.
      const srcs = glob(path.resolve(config.paths.public.patterns, data.pattern.id, '*'));
      
      // Copy all pattern files to the export folder.
      srcs.forEach((src) => {
        
        // Set the destination file path.
        const dest = path.resolve(config.patternExportDirectory, data.pattern.id, path.basename(src));
        
        // Copy the pattern file to the export folder.
        fs.copySync(src, dest);
        
      });
      
    });
    
    // Report done.
    console.log('Patterns exported successfully.');

  }, true);
  
};