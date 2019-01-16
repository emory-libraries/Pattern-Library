// Extracts data about all patterns.
module.exports = function() {
  
 // Load dependencies.
  const path = require('path');
  const _ = require('lodash');
  const fs = _.extend(require('fs-extra'), {
    readdirSyncRecursive: require('fs-readdir-recursive')
  });
  const fm = require('front-matter');

  // Load configurations.
  const config = require('../../patternlab-config.json');
  
  return fs.readdirSyncRecursive(path.resolve(config.paths.source.patterns)).map((pattern) => {
      
      // Get data about the asset.
      const ext = path.extname(pattern);
      const id = pattern.replace(/\//g, '-').replace(ext, '');
      const group = pattern.split('/')[0].replace(/\d+-/, '');
      const subgroup = pattern.split('/').length > 2 ? pattern.split('/')[1] : null;
      let name = path.basename(pattern.split('/')[pattern.split('/').length - 1].replace(/\d+-/, ''), ext);
      const variation = name.split('~').length == 2 ? name.split('~')[1] : null;

      // Clean up the name if it's a variaiton.
      if( variation ) name = name.replace(variation, '');
      
      // Save the asset data.
      return {
        path: pattern,
        ext,
        id,
        group,
        subgroup,
        name,
        variation,
        src: path.resolve(config.paths.source.patterns, pattern),
        dest: path.resolve(config.patternExportDirectory, id, `${id}${ext}`)
      };
      
    }).filter((md) => {
    
      // Skip any files that are not markdown.
      if( path.extname(md.path) !== `.md` ) return true;
    
      // Look for a pattern file.
      const name = path.basename(md.path, '.md') + `.${config.patternExtension}`;
      const pattern = path.resolve(config.paths.source.patterns, path.dirname(md.path), name); 
 
      // Ignore markdown files for pattern groups.
      if( !fs.existsSync(pattern) ) return false;
      
      // Otherwise, assume it's markdown for a pattern.
      return true;
      
    }).reduce((result, pattern) => {
    
      // Get the pattern ID.
      const id = pattern.id.replace(`~${pattern.variation}`, '');
    
      // Group patterns and their assets.
      if( !result[id] ) result[id] = {
        group: null,
        subgroup: null,
        name: null,
        pattern: {},
        variations: {},
        assets: [],
        data: {}
      };
    
      // Compile patterns.
      if( !pattern.variation ) {
        
        // Use extensions to determine the whether its a pattern or asset.
        switch(path.extname(pattern.path)) {

          case `.${config.patternExtension}`: 

            // Save the pattern.
            result[id].pattern = pattern; 
            result[id].group = pattern.group; 
            result[id].subgroup = pattern.subgroup; 
            result[id].name = pattern.name; 

            break;

          default: result[id].assets.push(pattern);

        }
        
        // Get data about the pattern.
        if( pattern.ext === '.md' ) {

          // Read the markdown file.
          const md = fs.readFileSync(pattern.src, 'utf8');

          // Parse the file's YAML front matter.
          const yml = fm(md);

          // Save the front matter data only.
          result[id].data = yml.attributes;

        }
        
      }
    
      // Capture variations.
      else {
        
        // Get variations and their assets.
        if( !result[id].variations[pattern.variation] ) result[id].variations[pattern.variation] = {
          pattern: {},
          assets: [],
          data: {}
        };
        
        // Use extensions to determine the whether its a pattern or asset.
        switch(path.extname(pattern.ext)) {

          case `.${config.patternExtension}`: 

            // Save the pattern.
            result[id].variations[pattern.variation].pattern = pattern; 
            result[id].variations[pattern.variation].group = pattern.group; 
            result[id].variations[pattern.variation].subgroup = pattern.subgroup; 
            result[id].variations[pattern.variation].name = pattern.name; 
            result[id].variations[pattern.variation].variation = pattern.variation; 

            break;

          default: result[id].variations[pattern.variation].assets.push(pattern);

        }
        
        // Get data about the pattern variation.
        if( pattern.ext === '.md' ) {

          // Read the markdown file.
          const md = fs.readFileSync(pattern.src, 'utf8');

          // Parse the file's YAML front matter.
          const yml = fm(md);

          // Save the front matter data only.
          result[id].variations[pattern.variation].data = yml.attributes;

        }
        
      }
      
    
      // Continue reducing.
      return result;
    
    }, {});
  
};