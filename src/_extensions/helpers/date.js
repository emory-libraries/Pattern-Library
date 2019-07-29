// Load dependencies.
const utils = require('handlebars-utils');
const moment = require('moment');
const date = require('date.js');
const _ = require('lodash');

// Builds helpers.
const helpers = {

  // Get a datetime object from a string date.
  datetime( string, options ) {

    // Set options.
    options = utils.context(this, {
      datejs: true
    }, options);

    // Return datetime object.
    return options.datejs ? moment(date(string)) : moment(new Date(string));

  },

  // Check if a moment is before another moment.
  momentIsBefore( ref, comp, unit ) {

    // Set the default unit.
    unit = _.isNil(unit) || _.isPlainObject(unit) ? null : unit;

    // Determine if the moment is before.
    return moment(ref).isBefore(comp, unit);

  },

  // Check if a moment is before today.
  momentIsBeforeToday: ( ref, unit ) => helpers.momentIsBefore(ref, moment(), unit),

  // Check if a moment is after another moment.
  momentIsAfter( ref, comp, unit ) {

    // Set the default unit.
    unit = _.isNil(unit) || _.isPlainObject(unit) ? null : unit;

    // Determine if the moment is after.
    return moment(ref).isAfter(comp, unit);

  },

  // Check if a moment is after today.
  momentIsAfterToday: ( ref, unit ) => helpers.momentIsAfter(ref, moment(), unit),

  // Check if a moment is the same as another moment.
  momentIsSame( ref, comp, unit ) {

    // Set the default unit.
    unit = _.isNil(unit) || _.isPlainObject(unit) ? null : unit;

    // Determine if the moment is the same.
    return moment(ref).isSame(comp, unit);

  },

  // Check if a moment is the same as today.
  momentIsSameToday: ( ref, unit ) => helpers.momentIsSame(ref, moment(), unit),

  // Check if a moment is before or the same as another moment.
  momentIsSameOrBefore( ref, comp, unit ) {

    // Set the default unit.
    unit = _.isNil(unit) || _.isPlainObject(unit) ? null : unit;

    // Determine if the moment is the same or before.
    return moment(ref).isSameOrBefore(comp, unit);

  },

  // Check if a moment is before or the same as today.
  momentIsSameOrBeforeToday: ( ref, unit ) => helpers.momentIsSameOrBefore(ref, moment(), unit),

  // Check if a moment is after or the same as another moment.
  momentIsSameOrAfter( ref, comp, unit ) {

    // Set the default unit.
    unit = _.isNil(unit) || _.isPlainObject(unit) ? null : unit;

    // Determine if the moment is the same or after.
    return moment(ref).isSameOrAfter(comp, unit);

  },

  // Check if a moment is after or the same as today.
  momentIsSameOrAfterToday: ( ref, unit ) => helpers.momentIsSameOrAfter(ref, moment(), unit),

  // Check if a moment is between two other moments.
  momentIsBetween( ref, compA, compB, unit, inclusivity ) {

    // Set the default unit and inclusivity.
    unit = _.isNil(unit) || _.isPlainObject(unit) ? null : unit;
    inclusivity = _.isNil(inclusivity) || _.isPlainObject(inclusivity) ? '()' : inclusivity;

    // Determine if the moment is between the two other moments.
    return moment(ref).isBetween(compA, compB, unit, inclusivity);

}

};

// Export helpers.
module.exports = helpers;
