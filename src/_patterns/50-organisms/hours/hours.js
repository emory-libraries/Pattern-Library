Components.register('hours', {

  props: {
    today: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    },
    hours: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      days: 7,
      date: {
        start: null,
        end: null
      },
      previous: {
        start: null,
        end: null
      },
      current: {
        hours: [],
        dates: []
      },
      active: null
    };
  },

  methods: {

    // Validate the dates as changes occur.
    validate() {

      // Make sure that the start date is set, or set it back to its previous value.
      if( this.date.start === '' ) this.date.start = this.previous.start;

      // Make sure that the end date is set, or set it back to its previous value.
      if( this.date.end === '' ) this.date.end = this.previous.end;

      // Convert the dates to moments to make validation easier.
      let start = moment(this.date.start);
      let end = moment(this.date.end);

      // Make sure the end date is always either the same as or after the start date.
      if( end.isBefore(start) ) end = moment(start).add(1, 'day');

      // Save the validated data.
      this.date.start = start.format('YYYY-MM-DD');
      this.date.end = end.format('YYYY-MM-DD');

      // Count the number of days betwen the start and end dates.
      this.days = Math.abs(start.diff(end, 'days')) + 1;

      // Update the hours data if one or both of the dates changes.
      if( this.date.start != this.date.previous || this.date.end != this.date.previous ) this.update();

      // Save the current dates as the new previous dates.
      this.previous.start = this.date.start;
      this.previous.end = this.date.end;

    },

    // Update the hours data that's displayed.
    update() {

      // Initialize a new set of hours and dates data.
      const hours = [];
      const dates = [];

      // Get the start and end dates as moments.
      const start = moment(this.date.start);
      const end = moment(this.date.end);

      // Calculate new dates for the given date range, and initialize hours sets.
      for( let i = 0; i < this.days; i++ ) {

        // Create new hours set on the given date.
        hours.push([]);

        // Get the date within the date range, and save it.
        dates.push(moment(start).add(i, 'days').format('YYYY-MM-DD'));

      }

      // For each set of location hours, extract the hours for the given date range.
      _.each(this.hours, (location) => {

        // Get the location's hours for each day.
        _.each(dates, (_date, i) => {

          // Get the current date as a moment.
          const date = moment(_date);

          // Initialize the location's hours for the current date.
          const current = {
            name: location.location,
            id: location.locationID,
            date,
            hours: false
          };

          // Only save the date and continue parsing hours if the current date falls within the semester.
          if( date.isBetween(location.date.start, location.date.end, 'day', '[]') ) {

            // Only capture the hours if the current date falls within the location's date range.
            if( date.isBetween(location.date.start, location.date.end, 'day', '[]') ) {

              // Capture the default hours of operation for the current date.
              current.hours = location.hours[date.day()];

              // Then, determine if the date falls within a range of exceptions.
              _.each(location.exceptions, (exception) => {

                // If the current date is an exception, then use the exception hours instead.
                if( date.isBetween(exception.date.start, exception.date.end, 'day', '[]') ) {

                  // Use the exception hours as the current date's hours.
                  current.hours = {
                    open: exception.open,
                    close: exception.close,
                    status: exception.status
                  };

                }

              });

            }

            // Save the location's hours for the given date only if the hours are valid.
            if( current.hours !== false ) hours[i].push(current);

          }

        });

      });

      // Update the current dates and hours that are being displayed.
      this.$set(this.current, 'hours', hours);
      this.$set(this.current, 'dates', dates);

      // Set the active date back to the first date in the new date range.
      this.active = dates[0];

    },

    // Determine if hours for any given day are available.
    available: ( hours ) => [].concat(...hours).length > 0,

    // Determine if hours for any given day are unavailable.
    unavailable: ( hours ) => [].concat(...hours).length === 0

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

  }

});
