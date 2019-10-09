// Load dependencies.
const _ = require('lodash');
const moment = require('moment');
const helpers = require('./exhibitions.js');

// Capture today's date.
const today = moment();

// Export helpers.
module.exports = {

  // Get the exhibits, grouped and sorted by dates.
  getEvents( events ) {

    // Get all dates for the exhibits.
    events = helpers.getAllDates(events);

    // Determine each exhibit's month.
    events = _.map(events, (event) => {

      // Get the event's start and end dates.
      const start = event.date.start;
      const end = event.date.end;

      // Initialize the event's month and year.
      event.month = {
        name: null,
        number: -1
      };
      event.year = -1;

      // Determine the month and year that the event falls in.
      event.month.number = _.compact(_.uniq([
        start.moment.isValid() ? start.moment.month() : null,
        end.moment.isValid() ? end.moment.month() : null
      ]))[0];
      event.year = _.compact(_.uniq([
        start.moment.isValid() ? start.moment.year() : null,
        end.moment.isValid() ? end.moment.year() : null
      ]))[0];

      // Get the corresponding name of the month and year that the event falls in.
      event.month.name = moment.months(true)[event.month.number];

      // Continue mapping events.
      return event;

    });

    // Then, group the events by year.
    events = _.groupBy(events, 'year');

    // Then, for each year, group the events by month, and sort by date.
    _.each(events, (group, year) => {

      // Group the events by month.
      let result = _.groupBy(group, 'month.number');

      // Then, sort the events by date.
      result = _.map(result, (group, month) => _.orderBy(group, [
        'date.end.timestamp',
        'date.start.timestamp'
      ], [
        'asc',
        'asc'
      ]));

      // Save the newly grouped and sorted events.
      events[year] = result;

    });

    // Return the exhibits after having been sorted and grouped.
    return events;

  }


};
