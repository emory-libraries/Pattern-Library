Components.register('filter-search', {

  props: {
    index: {
      type: Array
    },
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    keys: {
      type: Array,
      default() {
        return [];
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
