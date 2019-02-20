// Extracts data about all patterns.
module.exports = function() {
  
 // Load dependencies.
  const path = require('path');
  const _ = require('lodash');
  const glob = require('glob').sync;
  const fs = require('fs-extra');
  const fm = require('gray-matter');

  // Load configurations.
  const config = require('../../patternlab-config.json');
  
  return glob(path.resolve(config.paths.source.patterns, '**/*.md')).map((pattern) => {
      
    // Get data about the asset.
    const src = pattern.replace(path.resolve(config.paths.source.patterns) + '/', '');
    const id = src.replace(/\//g, '-').replace('.md', '').replace('~', '-');
    const group = src.split('/')[0].replace(/^\d+[-]/, '');
    const subgroup = src.split('/').length > 2 ? src.split('/')[1] : null;
    let name = path.basename(src.split('/')[src.split('/').length - 1].replace(/^\d+[-]/, ''), '.md');
    const variation = name.split('~').length == 2 ? name.split('~')[1] : null;
    const plid = `${group}-${name.replace('~', '-')}`;

    // Clean up the name if it's a variaiton.
    if( variation ) name = name.replace(`~${variation}`, '');

    // Save the asset data.
    return {
      path: src,
      base: src.replace('.md', ''),
      id,
      group,
      subgroup,
      name,
      variation,
      plid,
      src: pattern,
      dest: path.resolve(config.patternExportDirectory, id)
    };

  }).filter((md) => {

    // Look for a pattern file.
    const name = path.basename(md.path, '.md') + `.${config.patternExtension}`;
    const pattern = path.resolve(config.paths.source.patterns, path.dirname(md.path), name); 

    // Ignore markdown files for pattern groups.
    return fs.existsSync(pattern);

  }).reduce((result, pattern) => {

    // Get the pattern ID.
    const id = pattern.id.replace(`~${pattern.variation}`, '');

    // Group patterns and their assets.
    if( !result[id] ) result[id] = {
      group: null,
      subgroup: null,
      name: null,
      pattern: {},
      variation: null,
      assets: [],
      data: {}
    };


    // Capture pattern data.
    result[id].pattern = pattern;
    result[id].group = pattern.group;
    result[id].subgroup = pattern.subgroup;
    result[id].name = pattern.name;
    result[id].variation = pattern.variation;

    // Capture pattern assets.
    result[id].template = glob(path.resolve(config.paths.source.patterns, pattern.base + `.${config.patternExtension}`))[0];
    result[id].assets = glob(path.resolve(config.paths.source.patterns, pattern.base + `.!(md|${config.patternExtension})`));

    // Read the markdown file.
    const md = fs.readFileSync(pattern.src, 'utf8');

    // Parse the file's YAML front matter.
    const yml = fm(md);

    // Save the front matter data only.
    result[id].data = yml.data;

    // Continue reducing.
    return result;

  }, {});

  // Sample output:
  //
  //  {
  //    ...,
  //    '20-atoms-tabs-01-tab': {
  //      group: 'atoms',
  //      subgroup: 'tabs',
  //      name: 'tab',
  //      pattern: {
  //        path: '20-atoms/tabs/01-tab.md',
  //        base: '20-atoms/tabs/01-tab',
  //        id: '20-atoms-tabs-01-tab',
  //        group: 'atoms',
  //        subgroup: 'tabs',
  //        name: 'tab',
  //        variation: null,
  //        plid: 'atoms-tab',
  //        src: '/Users/<username>/Sites/Pattern-Library/src/_patterns/20-atoms/tabs/01-tab.md',
  //        dest: '/Users/<username>/Sites/Pattern-Library/pattern_exports/20-atoms-tabs-01-tab' 
  //      },
  //      variation: null,
  //      assets: [
  //        '/Users/<username>/Sites/Pattern-Library/src/_patterns/20-atoms/tabs/01-tab.css',
  //        '/Users/<username>/Sites/Pattern-Library/src/_patterns/20-atoms/tabs/01-tab.js',
  //        '/Users/<username>/Sites/Pattern-Library/src/_patterns/20-atoms/tabs/01-tab.json',
  //        '/Users/<username>/Sites/Pattern-Library/src/_patterns/20-atoms/tabs/01-tab.scss' 
  //      ],
  //      data: { 
  //        state: 'review'
  //      },
  //      template: '/Users/<username>/Sites/Pattern-Library/src/_patterns/20-atoms/tabs/01-tab.hbs' 
  //    },
  //    ...
  //  }
  
};