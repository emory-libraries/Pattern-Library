// Load dependencies.
const _ = require('lodash');
const moment = require('moment');

// Sets an array of truthy values.
const truthy = [
  'yes',
  'yeah',
  'yea',
  'ya',
  'positive',
  'sure',
  'okay',
  'ok',
  'true'
];

// Build hours helpers.
const hours = {

  // Parse hours into a usable form by interpretting the raw hours data passed in.
  getHours( hours, options ) {

    // Clone the hours so they're not affected.
    hours = _.cloneDeep(hours);

    // Capture date format.
    const format = _.get(this, 'format.date', 'MM-DD-YYYY');

    // Initialize utility methods to help with calculating usable hours.
    const utils = {

      // Extract and parse regular hours given some hours data.
      getRegularHours( hours ) {

        // Interpret the regular building hours for the building.
        _.each(moment.weekdays(true), (weekday) => {

          // Capture the weekday ID value.
          const id = _.kebabCase(weekday.toLowerCase());

          // Parse the building hours day by day.
          hours.hours[id] = _.merge(utils.getDayHours(hours.hours[id]), {weekday});

        });

        // Return the updated hours data.
        return hours;

      },

      // Extract and parse exceptional hours given some hours data.
      getExceptionalHours( hours ) {

        // Interpret all exceptional hours for the building.
        _.each(hours.exceptions, (exception, i) => {

          // Convert the exception's start and end dates to standard date strings.
          exception.start = moment(exception.start, format).format('YYYY-MM-DD');
          exception.end = moment(exception.end, format).format('YYYY-MM-DD');

          // Parse the exceptional building hours for the current day.
          exception = utils.getDayHours(exception);

          // Save the updated exception.
          hours.exceptions[i] = exception;

        });

        // Return the updated hours data.
        return hours;

      },

      // Extract and parse building hours given some building data.
      getBuildingHours( building ) {

        // Get regular hours for the building.
        building = utils.getRegularHours(building);

        // Get exceptional hours for the building.
        building = utils.getExceptionalHours(building);

        // Return the updated building hours.
        return building;

      },

      // Extract and parse services hours given some services data.
      getServicesHours( services ) {

        // Interpret the hours of each service.
        _.each(services, (service, i) => {

          // Convert the service dates into standard date strings.
          service.start = moment(service.start, format).format('YYYY-MM-DD');
          service.end = moment(service.end, format).format('YYYY-MM-DD');

          // Get regular hours for the service.
          service = utils.getRegularHours(service);

          // Get exceptional hours for the service.
          service = utils.getExceptionalHours(service);

          // Save the updated service hours.
          services[i] = service;

        });

        // Return the updated services data.
        return services;

      },

      // Extract and parse day hours given some day data.
      getDayHours( day ) {

        // If the hours are open on the given day...
        if( day.status == 'open' ) {

          // See if the hours are open all day.
          if( day['open-24-hours'] === true || truthy.includes(day['open-24-hours']) ) {

            // Set the hours as open 24 hours.
            day.open.formatted = 'Open 24 Hours';
            day.close.formatted = 'Open 24 Hours';
            day.formatted = 'Open 24 Hours';

          }

          // Otherwise, assume the day has set hours.
          else {

            // Parse the open time.
            day.open = utils.getCurrentHours(day, 'open');

            // Parse the close time.
            day.close = utils.getCurrentHours(day, 'close');

            // Get the formatted time.
            day.formatted = utils.getFormattedHours(day);

          }

        }

        // Otherwise, if the hours are closed on the given day...
        else {

          // Set the hours as closed.
          day.open.formatted = 'CLOSED';
          day.close.formatted = 'CLOSED';
          day.formatted = 'CLOSED';

        }

        // Return the updated day data.
        return day;

      },

      // Extract and parse current hours for the given day.
      getCurrentHours( day, type = 'open' ) {

        // Get the type of current hours to be parsed.
        const current = day[type];

        // Parse the structured hours data.
        if( current.format == 'structured' ) {

          // Parse the current time.
          if( _.isNil(current.hour) || current.hour === '' ) current.hour = 12;
          if( _.isNil(current.minute) || current.minute === '' ) current.minute = 0;
          if( _.isNil(current.meridiem) || current.meridiem === '' ) current.meridiem = 'AM';

          // Initialize the formatted value with the hour.
          current.formatted = current.hour;

          // Then, add the minute to the formatted value.
          current.formatted += current.minute === 0 ? '' : ':' + _.padStart(current.minute, 2, '0');

          // Finally, add the meridiem to the formatted value.
          current.formatted += current.meridiem.toLowerCase();

        }

        // Otherwise, use the freeform hours data as is.
        else current.formatted = current.text;

        // Return the updated current hours.
        return current;

      },

      // Get the formatted hours.
      getFormattedHours( day ) {

        // Initialize the formatted hours.
        let formatted = '';

        // Determine if an open or close time is formatted.
        const has = {
          open: !_.isNil(day.open.formatted) && day.open.formatted !== '',
          close: !_.isNil(day.close.formatted) && day.close.formatted !== '',
        };

        // Set the formatted hours text using both the open and close times.
        if( has.open && has.close ) {

          // Use the open and close times.
          formatted = `${day.open.formatted} - ${day.close.formatted}`;

        }

        // Otherwise, set the formatted hours using only the open time.
        else if( has.open ) formatted = day.open.formatted;

        // Otherwise, set the formatted hours using only the close time.
        else if( has.close ) formatted = day.close.formatted;

        // Return the formatted hours.
        return formatted;

      }

    };

    // Initialize the result.
    const result = {};

    // Extract weekday information.
    result.weekdays = moment.weekdays(true);

    // Extract information about the locations.
    result.locations = _.map(hours, (hour) => ({
      name: hour.location,
      id: _.kebabCase(hour.location.toLowerCase())
    }));

    // Extract information about the semesters.
    result.semesters = _.reduce(hours, (semesters, hour) => {

      // If no hours data is available for the semester, then return the semesters as is.
      if( hour.semesters.length === 0 ) return semesters;

      // Capture all semester data from the hours set.
      return _.uniq(_.concat(semesters, _.map(hour.semesters, (semester) => ({
        name: semester.semester,
        id: _.kebabCase(semester.semester.toLowerCase()),
        year: semester.year,
        link: semester.link
      }))));

    }, []);

    // Reformat each set of hours accordingly.
    result.hours = _.map(_.cloneDeep(hours), (location) => {

      // Save some identifying data to the location data.
      location.id = _.kebabCase(location.location.toLowerCase());

      // Parse the location's semester hours data.
      location.semesters = _.filter(_.map(location.semesters, (semester, i) => {

        // Save some identifying data to the semester data.
        semester.location = {
          name: location.location,
          id: location.id
        };
        semester.semester = {
          name: semester.semester,
          id: _.kebabCase(semester.semester.toLowerCase()),
          year: semester.year
        };

        // Determine if the semester should be visible.
        semester.visible = semester.visible === true || truthy.includes(semester.visible);

        // Convert the semester dates into standard date strings.
        semester.start = moment(semester.start, format).format('YYYY-MM-DD');
        semester.end = moment(semester.end, format).format('YYYY-MM-DD');

        // Get building hours for the semester.
        semester.building = utils.getBuildingHours(semester.building);

        // Get services hours for the semester.
        semester.services = utils.getServicesHours(semester.services);

        // Return the updated semester.
        return semester;

      }), (semester) => semester.visible === true);

      // Return the updated location hours.
      return location;

    });

    // Group hours accordingly for easier manipulation.
    result.grouped = {

      // Group hours data by semester.
      semesters: _.reduce(result.hours, (semesters, location) => {

        // Only extract location data that's visible.
        _.each(location.semesters, (semester) => {

          // Otherwise, locate the corresponding semester group in the semesters set.
          const index = _.findIndex(semesters, semester.semester);

          // Get the semester group from the semesters set.
          const group = semesters[index];

          // Save the semester hours into the semester group.
          group.hours.push(semester);

          // Update the semesters group in the semesters set.
          semesters[index] = group;

        });

        // Return the updated semester data.
        return semesters;

      }, _.map(_.cloneDeep(result.semesters), (semester) => _.set(semester, 'hours', []))),

      // Group hours data by location.
      locations: _.reduce(result.hours, (locations, hour) => {

        // Only extract semester data that's visible.
        _.each(hour.semesters, (semester) => {

          // Otherwise, locate the corresponding semester group in the locations set.
          const index = _.findIndex(locations, semester.location);

          // Get the semester group from the locations set.
          const group = locations[index];

          // Save the semester hours into the semester group.
          group.hours.push(semester);

          // Update the semesters group in the locations set.
          locations[index] = group;

        });

        // Return the updated semester data.
        return locations;

      }, _.map(_.cloneDeep(result.locations), (location) => _.set(location, 'hours', [])))

    };

    // Return the result.
    return result;

  },

  // Get hours for all locations and their services within a given date range.
  getHoursInRange( hours, start, end, options ) {

    // Initialize some utility methods for interpretting hours data.
    const utils = {

      // Get the hours for a given day based on regular business hours and any exceptions.
      getHoursOnDate( day, hours, exceptions = [] ) {

        // Get the regular hours on the given date.
        const regular = hours[day.weekday.toLowerCase()];

        // Determine if any exceptions apply on the given date.
        const exception = _.filter(exceptions, (exception) => {

          // Find any exceptions that fall on or around the given date.
          return moment(day.date).isBetween(exception.start, exception.end, 'day', '[]');

        })[0];

        // Return the regular hours or exception hours for the given date.
        return exception ? exception : regular;

      }

    };

    // Initialize the result.
    const result = {
      start,
      end,
      hours: []
    };

    // Calculate the days in the given date range, and create an empty hours set for each day.
    _.times(Math.abs(moment(start).diff(end, 'days')) + 1, (i) => {

      // Get the date within the date range.
      const date = moment(start).add(i, 'days');

      // Return an initialized hours set for the given date.
      result.hours.push({
        date: date.format('YYYY-MM-DD'),
        formatted: date.format('dddd, MMMM D, YYYY'),
        weekday: moment.weekdays(true)[date.day()],
        locations: []
      });

    });

    // Get all locations' hours for each day in the range.
    result.hours = _.map(result.hours, (day) => {

      // Locate all hours data for all locations on the given day.
      _.each(hours.grouped.locations, (location) => {

        // Initialize some hours data for the location.
        const data = {
          name: location.name,
          id: location.id,
          status: null,
          open: null,
          close: null,
          formatted: null,
          services: []
        };

        // Locate the semester hours for the given day for the given location.
        const semester = _.find(location.hours, (semester) => {

          // Locate the semester where the day falls between the semester's start and end dates.
          return moment(day.date).isBetween(semester.start, semester.end, 'day', '[]');

        });

        // If a semester could not be found, then indicate that.
        if( !semester ) {

          // Set the location's hours for the given day.
          data.status = 'tbd';
          data.open = 'Not available';
          data.close = 'Not available';
          data.formatted = 'Not available at this time';

        }

        // Otherwise, get the hours for the location on the given day.
        else {

          // Get the location's building hours.
          const building = semester.building;

          // Get the location's hours on the given date.
          const hours = utils.getHoursOnDate(day, building.hours, building.exceptions);

          // Capture the hours data.
          data.status = hours.status;
          data.open = hours.open.formatted;
          data.close = hours.close.formatted;
          data.formatted = hours.formatted;

          // Get the locations services.
          const services = semester.services;

          // Get the hours for each service on the given date.
          _.each(services, (service) => {

            // Get the service's hours on the given date.
            const hours = utils.getHoursOnDate(day, service.hours, service.exceptions);

            // Capture the hours data.
            data.services.push({
              name: service,
              id: _.kebabCase(service.name.toLowerCase()),
              status: hours.status,
              open: hours.open.formatted,
              close: hours.close.formatted,
              formatted: hours.formatted
            });

          });

        }

        // Save the location's data for the given day.
        day.locations.push(data);

      });

      // Return the hours for the given day.
      return day;

    });

    // Return the result.
    return result;

  },

  // Determine if hours are available for a given date based on some hours date range data.
  hoursAreAvailable( range, date, options ) {

    // Get the hours for the given date.
    const hours = _.filter(_.find(range.hours, {date}).locations, (location) => _.get(location, 'status', 'tbd') != 'tbd');

    // Determine if hours are available.
    return hours.length > 0 && _.concat([], ...hours).length > 0;

  },

  // Determine if hours are unavailable for a given date based on some hours date range data.
  hoursAreUnavailable( range, date, options ) {

    // Get the hours for the given date.
    const hours = _.filter(_.find(range.hours, {date}).locations, (location) => _.get(location, 'status', 'tbd') != 'tbd');

    // Determine if hours are unavailable.
    return hours.length === 0 || _.concat([], ...hours).length === 0;

  }

};

// Export helpers.
module.exports = hours;
