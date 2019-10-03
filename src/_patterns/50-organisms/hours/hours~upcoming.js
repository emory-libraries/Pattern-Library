Components.register('hours-upcoming', {

  props: {
    today: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    },
    hours: {
      type: Object,
      required: true
    },
    format: {
      type: Object,
      default() {
        return {
          date: [
            'MM-DD-YYYY'
          ],
          time: [
            'HH:mm A',
            'H:mm A',
            'HH:m A',
            'H:m A'
          ]
        };
      }
    }
  },

  data() {
    return {
      days: 7,
      max: 7,
      date: {
        start: null,
        end: null
      },
      previous: {
        start: null,
        end: null
      },
      active: null
    };
  },

  methods: {

    // Validate the dates as changes occur.
    validate() {

      // Make sure that the start date is set, or set it back to its previous value.
      if( this.date.start == '' ) this.date.start = this.previous.start;

      // Make sure that the end date is set, or set it back to its previous value.
      if( this.date.end == '' ) this.date.end = this.previous.end;

      // Convert the dates to moments to make validation easier.
      let start = moment(this.date.start);
      let end = moment(this.date.end);

      // Make sure the end date is always either the same as or after the start date.
      if( end.isBefore(start) ) end = moment(start).add(this.max - 1, 'day');

      // Make sure the start and end dates have <= the max alotted number of days between them.
      if( Math.abs(start.diff(end, 'days')) + 1 > this.max ) end = moment(start).add(this.max - 1, 'days');

      // Save the validated data.
      this.date.start = start.format('YYYY-MM-DD');
      this.date.end = end.format('YYYY-MM-DD');

      // Count the number of days between the start and end dates.
      this.days = Math.abs(start.diff(end, 'days')) + 1;

      // Update the hours data only if one or both of the dates changes.
      if( this.date.start == this.previous.start && this.date.end == this.previous.end ) return;

      // Save the current dates as the new previous dates.
      this.previous.start = this.date.start;
      this.previous.end = this.date.end;

    },

    // Determine if hours are available for a given date within the date range.
    available( date ) {

      // Get the hours for the given date.
      const hours = _.filter(_.find(this.range.hours, {date}).locations, (location) => _.get(location, 'status', 'tbd') != 'tbd');

      // Determine if hours are available.
      return hours.length > 0 && _.concat([], ...hours).length > 0;

    },

    // Determine if hours are unavailable for any given date within the date range.
    unavailable( date ) {

      // Get the hours for the given date.
      const hours = _.filter(_.find(this.range.hours, {date}).locations, (location) => _.get(location, 'status', 'tbd') != 'tbd');

      // Determine if hours are unavailable.
      return hours.length === 0 || _.concat([], ...hours).length === 0;

    }

  },

  filters: {

    format: ( date, format ) => moment(date).format(format)

  },

  created() {

    // Capture previous start and end date values.
    this.previous.start = this.date.start;
    this.previous.end = this.date.end;

  },

  mounted() {

    // Set the initially checked input.
    $(this.$refs.input[0]).prop('checked', true);

  },

  computed: {

    // Calculate the dates their respective hours for a given date range.
    range() {

      // Get the hours, start, and end dates.
      let hours = this.hours;
      let start = this.date.start;
      let end = this.date.end;

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

    }

  }

});
