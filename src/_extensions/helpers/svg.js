// Load dependencies.
const _ = require('lodash');
const glob = require('glob').sync;
const fs = require('fs-extra');
const path = require('path');

// Load configurations.
const config = require(path.resolve('./patternlab-config.json'));

// Load all icons and logos.
const icons = glob(path.join(config.paths.source.icons, '**/*.svg')).reduce((result, icon) => {

  // Get the icon's filename.
  const name = path.basename(icon, path.extname(icon)).toLowerCase();

  // Get the icon's contents.
  const svg = fs.readFileSync(icon, 'utf8');

  // Save the icons.
  result[name] = svg;

  // Continue.
  return result;

}, {});
const logos = glob(path.join(config.paths.source.logos, '**/*.svg')).reduce((result, logo) => {

  // Get the icon's filename.
  const name = path.basename(logo, path.extname(logo)).toLowerCase();

  // Get the icon's contents.
  const svg = fs.readFileSync(logo, 'utf8');

  // Save the icons.
  result[name] = svg;

  // Continue.
  return result;

}, {});

// Export helpers.
module.exports = {

  // Dynamically loads our icons by ID.
  icon( id ) {

    // Find our target icon file by exact ID.
    let icon = Object.keys(icons).filter((icon) => icon == id)[0];

    // Otherwise, find our target icon file by near ID.
    if( !icon ) icon = Object.keys(icons).filter((icon) => icon.indexOf(id.toLowerCase()) === 0)[0];

    // Return the icon.
    return icons[icon];

  },

  // Dynamically loads our logos by ID.
  logo( id ) {

    // Find our target logo file.
    let logo = Object.keys(logos).filter((logo) => logo == id)[0];

    // Otherwise, find our target logo file by near ID.
    if( !logo )  logo = Object.keys(logos).filter((logo) => logo.indexOf(id.toLowerCase()) === 0)[0];

    // Return the icon.
    return logos[logo];

  }

};
