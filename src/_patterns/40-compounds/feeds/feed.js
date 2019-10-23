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
    src: {
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
      feed: [],
      error: false,
      proxy: '/php/proxy.php?url='
    };
  },

  created() {

    // Fetch the feed's source.
    const fetch = $.getJSON(this.proxy + this.src);

    // Save the feed's source data.
    fetch

      // If the feed was able to be fetched, then save its data.
      .then((response) => this.feed = this.type.toLowerCase() == 'json' ? JSON.parse(response.body) : RSS.parseString(response.body).items)

      // Otherwise, indicate that there was an error with attempting to fetch the feed.
      .catch(() => this.error = true);

  },

  computed: {

    // Using the feed's data and model, return the feed content in the desired form.
    content() {

      // Get the feed's data.
      let feed = this.feed;

      // Get the feed's model.
      const model = this.model;

      // Initialize a helper for binding source data within a value.
      const bind = ( value, item, recursive = true ) => {

        // Handle array and object values differently.
        if( _.isArray(value) || _.isPlainObject(value) ) {

          // Determine which map function to use.
          const map = _.isArray(value) ? _.map : _.mapValues;

          // Only bind things within the array or object if recursion is enabled.
          if( recursive ) value = map(value, (v) => bind(v, item, recursive));

        }

        // Otherwise, handle simple values.
        else {

          // Initialize placeholders.
          let placeholders;

          // Search for placeholders that should be replaced with data from the given context.
          if( (placeholders = value.match(/\{\:[\S]+?\:\}/g)) ) {

            // Bind the placeholder data into the value.
            placeholders.forEach((placeholder) => {

              // Capture the placeholder's key.
              const key = placeholder.replace(/^\{\:|\:\}$/g, '');

              // Bind data from the given context into the value.
              value = value.replace(placeholder, _.get(context, key, ''));

            });

          }

          // Search for placeholders that should be replaced with data from the feed item.
          if( (placeholders = value.match(/\{[\S]+?\}/g)) ) {

            // Bind the placeholder data into the value.
            placeholders.forEach((placeholder) => {

              // Capture the placeholder's key.
              const key = placeholder.replace(/^\{|\}$/g, '');

              // Bind data from the given item's context into the value.
              value = value.replace(placeholder, _.get(item, key, ''));

            });

          }

        }

        // Return the bound value.
        return value;

      };

      // Map each item within the feed.
      feed = feed.map((data) => {

        // Loop through the data model, and map things as needed.
        _.each(model, (value, key) => {

          // Determine if the key is conditional.
          if( _.endsWith(key, '?') ) {

            // Get the key name without the conditional flag.
            key = _.trimEnd(key, '?');

            // Get the conditional that needs to be met in order for the value to be included.
            const condition = bind(value.criteria, data);

            // Get the criteria that must be met in order to display the conditional data.
            const criteria = new Function(`return ${condition};`);

            // Evaluate the criteria, and only include the value if the criteria was met.
            if( criteria() ) data[key] = bind(value.value, data);

          }

          // Otherwise, bind the data as is.
          else data[key] = bind(value, data);

        });

        // Return the updated data.
        return data;

      });

      // Return the feed's content after modeling it.
      return feed;

    },

    // Using the feed's data and model, return the feed content in the desired form with limits imposed.
    limited() {

      // Get a limited number of feed contents.
      return this.content.slice(0, this.limit);

    }

  }

});
