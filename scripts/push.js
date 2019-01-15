// Initialize the push method.
module.exports = function( id = null ) {
  
  // Load dependencies.
  const _ = require('lodash');
  const path = require('path');
  const fs = _.extend(require('fs-extra'), {
    
    symlinkExistsSync( src ) {
      
      // Initialize a flag.
      let exists = false;
      
      // Determine if the symlink exists.
      try {
        
        if( fs.lstatSync(src) ) exists = true;
        
      } catch (error) {
        
        exists = false;
        
      }
      
      // Return the flag.
      return exists;
      
    }
    
  });
  const glob = require('glob').sync;
  
  // Load configurations.
  const config = require('../patternlab-config.json');
  
  // Build list of things to push out.
  const push = [
    
    // [Style Guide](https://github.com/emory-libraries/style-guide-guide)
    {
      id: 'style-guide-guide',
      repo: 'https://github.com/emory-libraries/style-guide-guide',
      dir: path.resolve('../style-guide-guide'),
      files: [
        {
          src: path.resolve(config.patternExportDirectory, '*'),
          dest: 'patterns'
        }
      ],
      before() {
        
        // Export all patterns.
        require(path.resolve(__dirname, 'export.js'))();
        
      },
      after() {
        
        // Get the path to the patterns folder.
        const src = path.join(this.dir, 'patterns');
        
        // Set the path to a symlink destination in the includes folder.
        const dest = path.join(this.dir, '_includes/patterns');
        
        // Ensure that a symlink doesn't already exist, or delete it.
        if( fs.symlinkExistsSync(dest) ) fs.removeSync(dest);
        
        // Add a new symlink for the patterns folder in the includes folder.
        fs.symlinkSync(path.relative(this.dir, src), dest);
        
      }
    }
    
  ];
  
  // Capture errors.
  const errors = [];
  
  // Push things to other projects.
  push.forEach((item) => { 
    
    // Push items by ID if given, or push everything if no ID is given.
    if( !_.isNull(id) && item.id != id ) return;

    // Ensure that the other project exists on the current user's system.
    if ( fs.existsSync(item.dir) ) {
      
      // Do stuff that needs to happen before the item is pushed.
      if( item.before && _.isFunction(item.before) ) item.before();
      
      // Report that the item is being pushed.
      process.stdout.write(`Started pushing items to '${item.id}'... `);
    
      // Push files from our Pattern Library.
      item.files.forEach((file) => {
     
        // Copy all sources to the destination.
        glob(file.src).forEach((src) => { 
          
          // Get the destination.
          const dest = path.join(item.dir, file.dest, path.basename(src));
          
          // Ensure that the destination does not exist, or delete it.
          if( fs.existsSync(dest) ) fs.removeSync(dest);
          
          // Ensure that the source exists, and copy it.
          if( fs.existsSync(src) ) fs.copySync(src, dest);
          
          // Otherwise, report that the source could not be found.
          else errors.push(`Could not find '${src}' to push to '${item.id}'.`);
          
        });

      });
      
      // Report that the item was pushed.
      process.stdout.write(`Done.\n`);
      
      // Do stuff that needs to happen after the item is pushed.
      if( item.after && _.isFunction(item.after) ) item.after();
      
    }
    
    // Otherwise, report that the item could not be found.
    else {
      
      // Report.
      errors.push(`Could not find '${item.id}' on your system. ` +
                  `Please ensure that it has been downloaded from ` +
                  `'${item.repo}' and is located at '${item.dir}'.`);
      
    }
    
  });
  
  // Report errors.
  if( errors.length > 0 ) {
    
    // Report that the push completed with errors.
    console.log('Push completed with errors.');
    
    // Report errors.
    errors.forEach((error) => console.log(error));
    
  }
  
  // Otherwise, report done.
  else console.log('Push completed successfully.');
  
};