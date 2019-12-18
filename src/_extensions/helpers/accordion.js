// Load dependencies.
const _ = require('lodash');

// Export helpers.
module.exports = {

  // Assign IDs to all accordions and their panels.
  assignIDs( accordions ) {

    // Return the accordions and panels with IDs assigned.
    return _.map(accordions, (accordion) => {

      // Set the accordion's ID.
      accordion.id = _.get(accordion, 'id', _.kebabCase(accordion.title));

      // Assign panel IDs.
      accordion.panels = _.map(accordion.panels, (panel) => {

        // Set the panel's ID.
        panel.id = _.get(panel, 'id', _.kebabCase(panel.title));

        // Continue adding panel IDs.
        return panel;

      });

      // Continue adding accordion IDs.
      return accordion;

    });

  }

};
