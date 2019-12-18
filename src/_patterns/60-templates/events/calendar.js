Components.register('calendar', {

  props: {
    feed: {
      type: String,
      default: _.get(window.location.params, 'feed')
    },
    model: {
      type: Object,
      required: true
    },
    archive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      source: [],
      error: false,
      proxy: '/php/proxy.php?url=',
      type: 'json'
    };
  },

  created() {

    // Fetch the feed's source.
    const fetch = $.getJSON(ROOT + this.proxy + this.feed);

    // Save the feed's source data.
    fetch

      // If the feed was able to be fetched, then save its data.
      .then((response) => {

        // Attempt to get the feed data.
        new Promise((resolve, reject) => {

          // Initialize the result.
          const result = {
            source: [],
            type: 'json'
          };

          // Try to parse the feed as JSON.
          try {

            // Assume that most feed will be JSON.
            result.source = JSON.parse(response.body);

            // Make sure that the type is JSON.
            result.type = 'json';

            // Resolve and return the result.
            resolve(result);

          }

          // Otherwise, parse the feed as RSS.
          catch(error) {

            // Initialize a new RSS parser.
            const parser = new RSS({
              customFields: {
                item: [
                  'description',
                  'post-id',
                  'slash:comments',
                  'wfw:commentrss',
                  {keepArray: true}
                ]
              }
            });

            // Assume that the feed must be RSS if it's not JSON.
            parser.parseString(response.body).then((parsed) => {

              // Save the parsed feed data.
              result.source = parsed.items;

              // Set the type to RSS.
              result.type = 'rss';

              // Resolve and return the result.
              resolve(result);

            }).catch((error) => {

              // Otherwise, throw an error.
              reject(error);

            });

          }

        }).then((data) => {

          // Save the parsed feed data.
          this.source = data.source;

          // Set the type to feed data.
          this.type = data.feed;

        }).catch((error) => {

          // Indicate that an error occurred.
          this.error = true;

        });

      })

      // Otherwise, indicate that there was an error with the attempt to fetch the feed.
      .catch((error) => {

        // Indicate that an error occurred.
        this.error = true;

      });

  },

  computed: {

    // Using the feed's data and model, return the feed content in the desired form.
    content() {

      return EUL.mapFeed(this.source, this.model, {
        '__FEED__': this.feed
      });

    },

    // Build the calendar of events grouped by years then months and sorted by dates.
    calendar() {

      // Get the today's date.
      const today = moment();

      // Get information about the current date.
      const current = {
        moment: today,
        timestamp: today.unix(),
        datetime: today.toISOString(),
        year: today.year(),
        m: today.month(),
        month: moment.months(true)[today.month()]
      };

      // Get the event feed that the calendar should use.
      let events = this.content;

      // Interpret all dates for the events.
      events = _.map(events, (event) => {

        // Get the event's start and end dates.
        const start = event.date.start;
        const end = event.date.end;

        // Convert the event's start and end dates to objects containing more information about the dates.
        event.date.start = {
          datetime: start,
          moment: moment(start),
          timestamp: moment(start).unix()
        };
        event.date.end = {
          datetime: end,
          moment: moment(end),
          timestamp: moment(end).unix()
        };

        // Return the event with its updated date information.
        return event;

      });

      // Determine each event's month and year.
      events = _.map(events, (event) => {

        // Get the event's start and end dates.
        const start = event.date.start;
        const end = event.date.end;

        // Initialize the event's month and year.
        event.month = null;
        event.m = -1;
        event.year = -1;

        // Determine the month and year that the event falls in.
        event.m = _.compact(_.uniq([
          start.moment.isValid() ? start.moment.month() : null,
          end.moment.isValid() ? end.moment.month() : null
        ]))[0];
        event.year = _.compact(_.uniq([
          start.moment.isValid() ? start.moment.year() : null,
          end.moment.isValid() ? end.moment.year() : null
        ]))[0];

        // Get the corresponding name of the month and year that the event falls in.
        event.month = moment.months(true)[event.m];

        // Continue mapping events.
        return event;

      });

      // Initialize a collection of events grouped by year and month.
      let groups = [];

      // Then, group the events by year and month.
      _.each(events, (event) => {

        // Attempt to get the group that this event belongs to.
        let group =  _.find(groups, {m: event.m, year: event.year});

        // If the group exists, then add the event onto that group.
        if( group ) group.events.push(event);

        // Otherwise if it doesn't exist, then create it now, and add the event to it.
        else groups.push({
          month: event.month,
          m: event.m,
          year: event.year,
          name: `${event.month} ${event.year}`,
          events: [event]
        });

      });

      // Sort the events within the groups by date, then sort the groups by year and month.
      groups = _.sortBy(_.map(groups, (group) => {

        // Sort the events by date.
        group.events = _.orderBy(group.events, [
          'date.end.timestamp',
          'date.start.timestamp'
        ], [
          'asc',
          'asc'
        ]);

        // Continue mapping the groups.
        return group;

      }), ['year', 'm']);

      // If the calendar is in archive mode, then reverse the sort order to show most recent events first, and only display past events.
      if( this.archive ) groups = _.filter(_.reverse(groups), (group) => group.year < current.year || (group.year === current.year && group.m < current.m));

      // Otherwise, for standard calendars, only display current and future events.
      else groups = _.filter(groups, (group) => group.year > current.year || (group.year === current.year && group.m >= current.m));

      // Return the groups after having been sorted and grouped.
      return groups;

    }

  }

});
