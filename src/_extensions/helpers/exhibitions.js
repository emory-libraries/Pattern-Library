// Load dependencies.
const _ = require('lodash');
const moment = require('moment');

// Capture today's date.
const today = moment();

// Initialize helpers.
const helpers = {

  // Get the formatted dates for a single exhibit or event.
  getDates( date ) {

    // Set the formats.
    const format = {
      from: {
        date: [
          'MM-DD-YYYY',
          'MM-DD-YY',
          'M-D-YYYY',
          'M-D-YY',
          'MM/DD/YYYY',
          'MM/DD/YY',
          'M/D/YYYY',
          'M/D/YY'
        ],
        time: [
          'HH:mm',
          'H:mm',
          'h:mmA',
          'h:mma',
          'h:mm A',
          'h:mm a'
        ]
      },
      date: ( date ) => date.month ? 'MMMM YYYY' : 'MMMM D, YYYY',
      time: 'h:mm A'
    };

    // Get the start and end dates.
    const start = date.start;
    const end = date.end;

    // Get the start and end dates as moments.
    start.moment = moment(start.date, format.from.date).hour(0).minute(0).second(0).millisecond(0);
    end.moment = moment(end.date, format.from.date).hour(0).minute(0).second(0).millisecond(0);

    // If a time is given, then set the moment's time.
    if( start.time ) {

      // Parse the time as a moment.
      const time = moment(start.time, format.from.time).second(0).millisecond(0);

      // Add the time to the start moment.
      start.moment.hour(time.hour()).minute(time.minute());

    }
    if( end.time ) {

      // Parse the time as a moment.
      const time = moment(end.time, format.from.time).second(0).millisecond(0);

      // Add the time to the start moment.
      end.moment.hour(time.hour()).minute(time.minute());

    }

    // Get the start and end dates as timestamps.
    start.timestamp = start.moment.isValid() ? start.moment.unix() : NaN;
    end.timestamp = end.moment.isValid() ? end.moment.unix() : NaN;

    // Parse the start and end dates.
    start.formatted = start.date ? start.moment.format(format.date(start)) : null;
    end.formatted = end.date ? end.moment.format(format.date(end)) : null;

    // Initialize the formatted date.
    date.formatted = '';

    // Build the formatted date using both the start and end date.
    if( start.date && end.date ) {

      // If the start and end dates are the same, then use the given date as is.
      if( start.moment.isSame(end.date, 'day') ) {

        // Use either the start or end date since they're the same.
        date.formatted += start.formatted;

        // Then, capture both the start and end time.
        if( start.time && end.time ) {

          date.formatted += ' ' + start.moment.format(format.time);
          date.formatted += ' - ' + end.moment.format(format.time);

        }

        // Otherwise, capture only the start time.
        else if( start.time ) date.formatted += ' ' + start.moment.format(format.time);

        // Otherwise, capture only the end time.
        else if( end.time ) date.formatted += ' Until ' + end.moment.format(format.time);

      }

      // Otherwise, if the start and end dates are different, then use the date range.
      else date.formatted += start.formatted + ' - ' + end.formatted;

    }

    // Otherwise, build the formatted date using only the start date.
    else if( start.date ) {

      // If the start date is after today, then the date is in the future.
      if( start.moment.isAfter(today, 'day') ) date.formatted += 'Opens ' + start.formatted;

      // Otherwise, if the start date is today or before, then the date is current.
      else date.formatted += 'Since ' + start.formatted;

      // Then, capture the start time if also available.
      if( start.time ) date.formatted += ' ' + start.moment.format(format.time);

    }

    // Otherwise, build the formatted date using only the end date.
    else if( end.date ) {

      // If the end date is after today, then the date is in the future.
      if( end.moment.isAfter(today, 'day') ) date.formatted += 'Through ' + end.formatted;

      // Otherwise, if the end date is today or before, then the date is current.
      else date.formatted += 'Ends ' + end.formatted;

      // Otherwise, if the end date is today or before, then the date is current.
      if( end.time ) date.formatted += ' ' + end.moment.format(format.time);

    }

    // Otherwise, just set the date to TBD.
    else date.formatted = 'TBD';

    // Return the formatted dates.
    return date;

  },

  // Get the formatted dates for multiple exhibits or events.
  getAllDates: ( collection ) => _.map(collection, (thing) => {

    // Get the dates for the given thing.
    thing.date = helpers.getDates(thing.date);

    // Continue mapping all the things.
    return thing;

  }),

  // Get the exhibits, grouped and sorted by dates.
  getExhibits( exhibits ) {

    // Get all dates for the exhibits.
    exhibits = helpers.getAllDates(exhibits);

    // Determine each exhibit's status as either current or past.
    exhibits = _.map(exhibits, (exhibit) => {

      // Get the exhibit's start and end dates.
      const start = exhibit.date.start;
      const end = exhibit.date.end;

      // Only compare dates by month if preferred.
      if( start.month || end.month ) {

        // If today is >= the start date, then use the end date to determine if it's current.
        if( start.date && today.isSameOrAfter(start.moment, 'month') ) {

          // If today is <= the end date, then assume the exhibit is current.
          if( end.date && today.isSameOrBefore(end.moment, 'month') ) exhibit.status = 'current';

          // Otherwise, if no end date is given, then assume the exhibit is current.
          else if ( !end.date ) exhibit.status = 'current';

          // Otherwise, assume the exhibit is in the past.
          else exhibit.status = 'past';

        }

        // Otherwise, if today <= the end date, then assume the exhibit is current.
        else if( end.date && today.isSameOrBefore(end.moment, 'month') ) exhibit.status = 'current';

        // Otherwise if it has neither a start or end date, then assume the status is unknown.
        else if( !start.date && !end.date ) exhibit.status = 'unknown';

        // Otherwise, assume the exhibit is in the past.
        else exhibit.status = 'past';

      }

      // Otherwise, compare dates by day.
      else {

        // If today is >= the start date, then use the end date to determine if it's current.
        if( start.date && today.isSameOrAfter(start.moment, 'day') ) {

          // If today is <= the end date, then assume the exhibit is current.
          if( end.date && today.isSameOrBefore(end.moment, 'day') ) exhibit.status = 'current';

          // Otherwise, if no end date is given, then assume the exhibit is current.
          else if( !end.date ) exhibit.status = 'current';

          // Otherwise, assume the exhibit is in the past.
          else exhibit.status = 'past';

        }

        // Otherwise, if the today <= the end date, then assume the exhibit is current.
        else if( end.date && today.isSameOrBefore(end.moment, 'day') ) exhibit.status = 'current';

        // Otherwise if it has neither a start or end date, then assume the status is unknown.
        else if( !start.date && !end.date ) exhibit.status = 'unknown';

        // Otherwise, assume the exhibit is in the past.
        else exhibit.status = 'past';

      }

      // Continue mapping exhibits.
      return exhibit;

    });

    // Then, group the exhibits by status.
    exhibits = _.groupBy(exhibits, 'status');

    // Then, sort the current exhibits by date.
    exhibits.current = _.orderBy(exhibits.current, [
      'date.end.timestamp',
      'date.start.timestamp'
    ], [
      'asc',
      'asc'
    ]);

    // Then, sort the past exhibits by date.
    exhibits.past = _.orderBy(exhibits.past, [
      'date.end.timestamp',
      'date.start.timestamp'
    ], [
      'desc',
      'desc'
    ]);

    // Return the exhibits after having been sorted and grouped.
    return exhibits;

  },

  // Get exhibit extras for the deep dive section.
  getExtras( extras ) {

    // Remove any extra without valid content.
    extras.content = _.filter(extras.content, (content) => {

      // A heading and some text must exist.
      return !_.isNil(content.heading) &&
             content.heading !== '' &&
             _.isString(content.text) &&
             content.text !== '';

    });

    // Return the extras.
    return extras;

  }

};

// Export helpers.
module.exports = helpers;
