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

},

  // Create a moment from the given string in a given format.
  momentFrom( string, formats, options ) {

    // If any of the following keywords were given, then unset the string to default to the current day.
    if( ['now', 'today'].includes(string) ) string = undefined;

    // Create a moment from the given date string and formats.
    return moment(string, formats);

  },

  // Modify a moment using the native moment API.
  momentAPI( _moment, options ) {

    // If a moment was not given, and only the API was initialized, then swap the passed arguments.
    if( !_.isPlainObject(options) ) {

      // Assume only the options were passed.
      options = _moment;

      // Unset the moment.
      _moment = null;

    }

    // Extract API settings from the given options.
    const settings = _.get(options, 'hash', {});

    // If any of the following keywords were given, then unset the string to default to the current day.
    if( ['now', 'today'].includes(_moment) ) _moment = undefined;

    // If a moment was not given, then try to covert the given thing to a moment.
    if( !moment.isMoment(_moment) ) _moment = moment(_moment || settings.date, settings.fromFormat);

    // Only continue if a valid moment exists.
    if( !_moment.isValid() ) return;

    // Get a list of operations.
    const operations = _.filter(_.keys(settings), (key) => {

      // Ignore non-method keys.
      return !['date', 'fromFormat', 'order'].includes(key);

    });

    // Get the intended order of operations.
    let order = _.get(settings, 'order', operations.length == 1 ? operations[0] : false);

    // Convert the moment to an array if it was given as a string.
    if( _.isString(order) ) order = order.split(/[,;]? +|\./).map(_.trim);

    // Remove any settings that are known non-methods.
    _.unset(settings, 'date');
    _.unset(settings, 'fromFormat');
    _.unset(settings, 'order');

    // Require that an order be given (for two or more operations), or always return the moment as is.
    if( !order ) return _moment;

    // Manipulate the moment based on the given order of operations.
    _.each(order, (method) => {

      // Only continue modifying the moment if it's still in moment form.
      if( !moment.isMoment(_moment) ) return;

      // Skip the method if a matching method setting was not given or if the method doesn't exist.
      if( !_.has(settings, method) || !_moment[method] ) return;

      // Otherwise, get the method's value.
      let value = settings[method];

      // For select methods, enable an easier-to-use string syntax for passing arguments.
      if( ['add', 'subtract'].includes(method) && _.isString(value) ) value = value.split(' ').map(_.trim);

      // Otherwise, for all other values, convert it to array form if it wasn't given as one.
      else if( !_.isArray(value) ) value = [value];

      // For getter/setter methods, allow empty values to indicate that the getter should be used.
      if( [
        'millisecond', 'milliseconds',
        'second', 'seconds',
        'minute', 'minutes',
        'hour', 'hours',
        'date', 'dates',
        'day', 'days',
        'weekday',
        'isoWeekday',
        'dayOfYear',
        'week', 'weeks',
        'isoWeek', 'isoWeeks',
        'month', 'months',
        'quarter', 'quarters',
        'year', 'years',
        'weekYear',
        'isoWeekYear',
        'weeksInYear',
        'isoWeeksInYear',
        'valueOf',
        'unix',
        'daysInMonth',
        'toDate',
        'toArray',
        'toJSON',
        'toISOString',
        'toObject',
        'inspect'
      ].includes(method) && [
        true,
        null,
        undefined
      ].includes(value[0]) ) _moment = _moment[method]();

      // For getter methods that accept arguments, manipulate the moment but capture the output.
      else if( [
        'format',
        'fromNow',
        'from',
        'toNow',
        'to',
        'calendar',
        'difference',
        'valueOf',
        'unix',
        'daysInMonth',
        'toDate',
        'toArray',
        'toJSON',
        'toISOString',
        'toObject',
        'inspect'
      ].includes(method) ) _moment = value ? _moment[method](...value) : _moment[method]();

      // Otherwise, directly manipulate the moment using the given method.
      else _moment[method](...value);

    });

    // Return the modified method.
    return _moment;

  }

};

// Export helpers.
module.exports = helpers;
