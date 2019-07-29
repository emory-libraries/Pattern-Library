// Export `scripts` task.
module.exports = function( pattern ) {

  // Load dependencies.
  const grunt = require('grunt');
  const glob = require('glob').sync;
  const path = require('path');
  const fs = require('fs-extra');
  const chalk = require('chalk');
  const utils = require('./utils.js');
  const _ = require('lodash');
  const moment = require('moment');

  // Load configurations.
  const config = require('../patternlab-config.json');

  // Set status flags.
  const statuses = config.patternStateCascade;

  // Set the path to a JSON file that holds pattern status data.
  const json = path.resolve('pattern-status.json');

  // Initialize regexes for finding a pattern's status.
  const regex = ( key ) => new RegExp(`^${key}: (.+)$`, 'm');

  // Get data about all patterns.
  const patterns = utils.patterns();

  // Get atomic structure of patterns.
  const atomic = utils.atomic();

  // Get directory names of atomic group.
  const atomicGroup = Object.keys(atomic).reduce((result, group) => {

    // Determine the atomic group's folder name.
    result[group] = atomic[group] ? `${atomic[group]}-${group}` : group;

    // Continue.
    return result;

  }, {});

  // Enable exporting of all pattern statuses to a JSON file.
  if( pattern == 'export' ) {

    // Load JSON data.
    const data = fs.existsSync(json) ? require(json) : {};

    // Get status data for all patterns.
    _.each(patterns, (pattern, id) => {

      // Save the pattern status.
      data[id] = pattern.data.state;

    });

    // Save the data to a JSON file.
    fs.writeJsonSync(json, data, {spaces: 2});

    // Report done.
    grunt.log.success(`Exported pattern statuses to \'${path.basename(json)}\' successfully.`);

  }

  // Enable importing of all pattern statuses from a JSON file.
  else if( pattern == 'import' ) {

    // Load JSON data.
    const data = fs.existsSync(json) ? require(json) : {};

    // Update statuses for each pattern.
    _.each(data, (status, id) => {

      // Get pattern data.
      const pattern = patterns[id];

      // Get the pattern file.
      const file = path.resolve(config.paths.source.patterns, pattern.pattern.path.replace('.hbs', '.md'));

      // Get the file's contents.
      let contents = fs.readFileSync(file, 'utf8');

      // Capture the pattern's old status.
      const old = contents.match(regex('state'))[1];

      // Replace the status.
      contents = contents.replace(regex('state'), `state: ${status}`);

      // Change the updated date.
      if( old != status ) contents.replace(regex('updated'), `updated: ${moment().format('MM/DD/YYYY')}`);

      // Update the pattern's status.
      fs.writeFileSync(file, contents);

      // Report that the status was changed.
      grunt.log.writeln(chalk.green('✓') + ` ${id}: ${old} --> ${status}`);

    });

    // Report done.
    grunt.log.success(`\nImported pattern statuses from \'${path.basename(json)}\' successfully.`);

  }

  // Enable updating of pattern statuses.
  else {

    // Get the flag.
    let flag = process.argv.slice(3);

    // Ignore invalid flags.
    if( flag.length === 0 ) {

      // Report pattern error.
      grunt.log.warn(`Missing a status flag. Please provide one as an \'--option\' then try again.`);

      // Exit.
      return;

    }

    // Parse the flag as a status.
    const status = flag[0].substring(2);

    // Ignore invalid flags.
    if( !statuses.includes(status) ) {

      // Report status error.
      grunt.log.warn(`Invalid status \'${status}\'. Please choose a status from the list below:`);
      grunt.log.warn(statuses.join('\n'));

      // Exit.
      return;

    }

    // Find the pattern data.
    const data = Object.values(patterns).filter((data) => data.pattern.plid == pattern);

    // Exit if the pattern couldn't be found.
    if( data.length === 0 ) {

      // Report pattern error.
      grunt.log.warn(`Could not find pattern \'${pattern}\'. Verify that it exists then try again.`);

      // Exit.
      return;

    }

    // Find pattern file.
    const file = data[0].pattern.src;

    // Get the file's contents.
    let contents = fs.readFileSync(file, 'utf8');

    // Capture the pattern's old status.
    const old = contents.match(regex('state'))[1];

    // Replace the status.
    contents = contents.replace(regex('state'), `state: ${status}`);

    // Change the updated date.
    if( old != status ) contents.replace(regex('updated'), `updated: ${moment().format('MM/DD/YYYY')}`);

    // Update the pattern's status.
    fs.writeFileSync(file, contents);

    // Report that the status was changed.
    grunt.log.writeln(chalk.green('✓') + ` ${pattern}: ${old} --> ${status}`);

    // Report done.
    grunt.log.success(`\nUpdated pattern statuses for \'${pattern}\' successfully.`);

  }

};
