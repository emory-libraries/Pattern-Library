Components.register('search', {

  props: {
    services: {
      type: Array
    },
    param: {
      type: String,
      default: ':query'
    },
    uid: {
      type: [String, Number],
      required: true
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
      cancel: {
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

      // Validate search field, and if it's invalid, prevent the search from submitting.
      if( !this.valid ) $event.preventDefault();

    },

    reset() {

      // Reset the search query.
      this.query = '';

    }

  },

  created() {

    // Set the default source.
    this.source = _.find(this.services, {default: true}) || this.services[0];

    // Listen for source changes as needed.
    Events.$on(`${this.uid}:relay`, (data) => {

      // Search for the source by ID.
      if( _.find(this.services, {id: data.value}) ) this.source = _.find(this.services, {id: data.value});

    });

  },

  computed: {

    // Get the placeholder text.
    placeholder() {

      return _.find(this.services, {id: this.source.id}).placeholder || '';

    },

    // Get the search URL.
    href() {

      return _.find(this.services, {id: this.source.id}).src.replace(this.param, this.query);

    },

    // Make sure a query was entered before searching.
    valid() {

      return !_.isNil(this.query) && this.query !== '';

    }

  },

  watch: {

    valid( isValid ) {

      this.button.isDisabled = isValid === false;
      this.cancel.isDisabled = isValid === false;

    }

  }

});
