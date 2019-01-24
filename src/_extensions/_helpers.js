// Load helpers.
const _ = require('lodash');
const glob = require('glob').sync;
const fs = require('fs-extra');
const path = require('path');

// Load all icons and logos.
const icons = glob('./src/icons/*.svg').reduce((result, icon) => {

  // Get the icon's filename.
  const name = path.basename(icon, path.extname(icon));

  // Get the icon's contents.
  const svg = fs.readFileSync(icon, 'utf8');

  // Save the icons.
  result[name] = svg;

  // Continue.
  return result;

}, {});
const logos = glob('./src/logos/*.svg').reduce((result, logo) => {

  // Get the icon's filename.
  const name = path.basename(logo, path.extname(logo));

  // Get the icon's contents.
  const svg = fs.readFileSync(logo, 'utf8');

  // Save the icons.
  result[name] = svg;

  // Continue.
  return result;

}, {});

// Export helpers.
module.exports = _.extend(require('handlebars-helpers')(), {

  // Dynamically loads our icons by ID.
  icon( id ) {

    // Find our target icon file.
    const icon = Object.keys(icons).filter((icon) => icon.indexOf(id) === 0)[0];

    // Return the icon.
    return icons[icon];

  },

  // Dynamically loads our logos by ID.
  logo( id ) {

    // Find our target logo file.
    const logo = Object.keys(logos).filter((logo) => logo.indexOf(id) === 0)[0];

    // Return the icon.
    return logos[logo];

  }

});
