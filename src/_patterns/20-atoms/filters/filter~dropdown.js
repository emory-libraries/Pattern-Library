Components.register('filter-dropdown', {

  props: {
    index: {
      type: Array
    },
    subject: {
      type: String,
      default: ''
    },
    field: {
      type: String,
    },
    config: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      selected: null,
      fuzzy: null,
      isFocus: false,
      isDisabled: false
    };
  },

  methods: {

    filter() {

      // Remove previous filtering.
      this.fuzzy.unfilter();

      // Make sure an option was selected before filtering.
      if( this.valid ) {

        // Filter the results.
        this.fuzzy.filter((item) => {

          // Get the item's corresponding field data.
          const field = item[this.field];

          // Add query string in browser history
          if (window.history.pushState && this.selected) {

              // Rewrite URL with new parameter
              var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?subject=' + this.selected.split(' ').join('+');

              // Push new URL to history
              window.history.replaceState({ path: window.location.pathname, query: { subject: this.selected.split(' ').join('+') } },'',newurl);
          }

          // Determine if the field matches.
          return _.isArray(field) ? field.includes(this.selected) : field == this.selected;

        });

      } else {
        // If it's not valid, clear everything.
        this.cancel();
      }

    },

    cancel() {

      // Clear the search results.
      if( this.fuzzy.filtering.filtered ) this.fuzzy.unfilter();

      // Clear the selection.
      this.selected = '';

      // Clear query string in browser history
      if (window.history.pushState) {

          // Rewrite URL without parameter
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;

          // Push new URL to history
          window.history.replaceState({ path: window.location.pathname, query: {} },'',newurl);

      }

    }

  },

  mounted() {

    // Initialize the search utility.
    this.fuzzy = new Fuzzy(this.index, this.config);

    // If global.location.params is not undefined, plusify it and assign it to subjects
    if (global.location.params.subject) {

      let subject = global.location.params.subject.split('+').join(' ');

      // Set selected to subject
      this.selected = subject;
    }

    // Initialize a filter if an initial selection was made.
    if( this.valid ) this.filter();

  },

  computed: {

    // Make sure a query was entered before searching.
    valid() {

      return !_.isNil(this.selected) && this.selected !== '';

    }

  }

});