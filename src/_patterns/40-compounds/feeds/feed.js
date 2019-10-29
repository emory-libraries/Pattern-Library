Components.register('feed', {

  props: {
    limit: {
      type: Number,
      default: 5
    },
    model: {
      type: Object,
      required: true
    },
    feed: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'json'
    }
  },

  data() {
    return {
      source: [],
      error: false,
      proxy: '/php/proxy.php?url='
    };
  },

  created() {

    // Fetch the feed's source.
    const fetch = $.getJSON(ROOT + this.proxy + this.feed);

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

      return EUL.mapFeed(this.source, this.model);

    },

    // Using the feed's data and model, return the feed content in the desired form with limits imposed.
    limited() {

      return this.content.slice(0, this.limit);

    }

  }

});
