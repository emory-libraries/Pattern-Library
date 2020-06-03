Components.register('filter-search', {

  props: {
    index: {
      type: Array
    },
    keys: {
      type: Array,
      default() {
        return [];
      }
    },
    settings: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      query: '',
      fuzzy: null,
      button: {
        isActive: false,
        isHover: false,
        isFocus: false,
        isDisabled: true
      },
      input: {
        isHover: false,
        isFocus: false,
        isDisabled: false
      },
      config: {
        threshold: 0.2, //was 0.6
        similarity: 0.5, //was 0.3
        location: 0, //was 0
        distance: 300, //was 300
        insensitive: true,
        sort: false
      }
    };
  },

  methods: {

    search() {

      // Reset search results.
      this.fuzzy.unsearch();

      // Make sure a query was entered before filtering.
      if( this.valid ) {

        // Filter the results.
        this.fuzzy.search(this.query, this.keys);

      }

    },

    cancel() {

      // Clear the search results.
      if( this.fuzzy.searching.searched ) this.fuzzy.unsearch();

      // Clear the query.
      this.query = '';

    }
  },

  mounted() {

    // Merge settings with default configurations.
    this.config = _.merge({
      threshold: 0.2, //was 0.6
      similarity: 0.5, //was 0.3
      location: 0, //was 0
      distance: 300, //was 300
      insensitive: true,
      sort: false
    }, this.settings);

    // Initialize the search utility.
    this.fuzzy = new Fuzzy(this.index, this.config);

    // Initialize a search if an initial query was given.
    if( this.valid ) this.search();

  },

  computed: {

    // Make sure a query was entered before searching.
    valid() {

      return !_.isNil(this.query) && this.query !== '';

    }

  }

});
