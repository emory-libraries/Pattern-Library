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
      loading: true,
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

          // Update the page's title.
          document.title = he.decode(_.get(this.event, 'title', 'Event Not Found'));

          // Indicate that loading is done.
          this.loading = false;

        }).catch((error) => {

          // Indicate that an error occurred.
          this.error = true;

          // Update the page's title.
          document.title = 'Event Not Found';

          // Indicate that loading is done.
          this.loading = false;

        });

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

      return EUL.mapFeed(this.source, this.model, {
        '__FEED__': this.feed,
        '__ID__': this.id
      });

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
