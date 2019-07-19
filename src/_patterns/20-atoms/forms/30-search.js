Components.register('search', {

  props: {
    services: {
      type: Array
    },
    param: {
      type: String,
      default: ':query'
    }
  },

  data() {
    return {
      source: null,
      query: '',
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

    validate( $event ) {

      if( !this.valid ) $event.preventDefault();

    }

  },

  created() {

    // Set the default source.
    this.source = _.find(this.services, {default: true}).id;

    // Listen for source changes as needed.
    Events.$on(`${this._uid}:relay`, (data) => {

      // Search for the source by ID.
      if( _.find(this.services, {id: data.value}) ) this.source = _.find(this.services, {id: data.value});

    });

  },

  computed: {

    // Get the placeholder text.
    placeholder() {

      return _.find(this.services, {id: this.source}).placeholder || '';

    },

    // Get the search URL.
    href() {

      return _.find(this.services, {id: this.source}).src.replace(this.param, this.query);

    },

    // Make sure a query was entered before searching.
    valid() {

      return !_.isNil(this.query) && this.query !== '';

    }

  }

});
