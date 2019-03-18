// Load dependencies.
const path = require('path');
const moment = require('moment');
const utils = require(path.resolve('./scripts/utils.js'));
const _ = require('lodash');

// Load configurations.
const config = require(path.resolve('patternlab-config.json'));

// Get pattern data.
const patterns = utils.patterns();

// Export helpers.
module.exports = {

  patternData( id = null ) {

    // Use all patterns by default.
    if( !_.isString(id) ) return patterns;

    // Otherwise, extract the pattern given.
    else return patterns[id] || _.filter(patterns, (pattern) => pattern.pattern.plid == id);

  },

  patternStatus( id = null ) {

    // Get the pattern data.
    let data = this.patternData( id );

    // Get pattern status data.
    return _.map(data, (pattern) => {

      // Extract pattern status data.
      return {
        status: pattern.data.state,
        id: pattern.pattern.id,
        plid: pattern.pattern.plid,
        group: pattern.group,
        subgroup: pattern.subgroup,
        name: pattern.name,
        variation: pattern.variation,
        src: `/patterns/${pattern.pattern.id}/${pattern.pattern.id}.html`,
        js: pattern.data.js || false,
        php: pattern.data.php || false,
        created: pattern.data.created ? moment(pattern.data.created, 'MM/DD/YYYY').format('MM D, YYYY') : null,
        updated: pattern.data.updated ? moment(pattern.data.updated, moment.ISO_8601).format('MM D, YYYY') : null
      };

    });

  }

};
