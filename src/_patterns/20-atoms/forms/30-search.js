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
        isDisabled: false
      },
      input: {
        isHover: false,
        isFocus: false,
        isDisabled: false
      }
    };
  },

  methods: {

    validate() {

      // Make sure a query string was entered before allowing a search.
      return !_.isNil(this.query) && this.query !== '';

    }

  },

  created() {

    // Set the default source.
    this.source = _.find(this.services, {default: true}).id;

  },

  computed: {

    // Get the placeholder text.
    placeholder() {

      return _.find(this.services, {id: this.source}).placeholder || '';

    },

    // Get the search URL.
    href() {

      return _.find(this.services, {id: this.source}).src.replace(this.param, this.query);

    }

  }

});
