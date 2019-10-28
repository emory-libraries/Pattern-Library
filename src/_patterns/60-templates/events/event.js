Components.register('event', {

  props: {
    feed: {
      type: String,
      default: _.get(window.location.params, 'feed')
    },
    id: {
      type: [String, Number],
      default: _.get(window.location.params, 'id')
    },
    model: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      source: [],
      error: false,
      proxy: '/php/proxy.php?url=',
      loading: true
    };
  },

  created() {

    // Fetch the feed's source.
    const fetch = $.getJSON(this.proxy + this.feed);

    // Save the feed's source data.
    fetch

      // If the feed was able to be fetched, then save its data.
      .then((response) => {

        // Try to parse the feed as JSON.
        try {

          // Assume that most feed will be JSON.
          response.body = JSON.parse(response.body);

        }

        // Otherwise, parse the feed as RSS.
        catch(error) {

          // Assume that feed must be RSS if it's not JSON.
          response.body = RSS.parseString(response.body).items;

        }

        // Then, save the feed data.
        this.source = response.body;

        // Update the page's title.
        document.title = _.get(this.event, 'title', 'Event Not Found');

        // Indicate that loading is done.
        this.loading = false;

      })

      // Otherwise, indicate that there was an error with the attempt to fetch the feed.
      .catch((error) => {

        // Indicate that an error occurred.
        this.error = true;

        // Update the page's title.
        document.title = 'Event Not Found';

        // Indicate that loading is done.
        this.loading = false;

      });

  },

  computed: {

    // Using the feed's data and model, return the feed content in the desired form.
    content() {

      return EUL.mapFeed(this.source, this.model);

    },

    // Extract the targeted feed item's data using the given ID.
    event() {

      // Locate the event based on the ID, where special keywords are also allowed.
      switch(this.id) {
        case '__FIRST__': return this.content[0];
        case '__LAST__': return this.content[this.content.length - 1];
        default: return _.find(this.content, {id: this.id});
      }

    }

  }

});
