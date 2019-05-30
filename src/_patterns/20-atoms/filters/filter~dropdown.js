Components.register('filter-dropdown', {

  props: {
    index: {
      type: Array
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

          // Determine if the field matches.
          return _.isArray(field) ? field.includes(this.selected) : field == this.selected;

        });

      }

    },

    cancel() {

      // Clear the search results.
      this.fuzzy.unfilter();

      // Clear the selection.
      this.selected = this.defaults.selected || '';

    }

  },

  mounted() {

    // Initialize the search utility.
    this.fuzzy = new Fuzzy(this.index, this.config);

  },

  computed: {

    // Make sure a query was entered before searching.
    valid() {

      return !_.isNil(this.selected) && this.selected !== '';

    }

  }

});
