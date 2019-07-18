// Register a Tab component.
Components.register('tab', {

  props: {
    menu: {
      type: String,
      default: null
    },
    id: String
  },

  data() {
    return {
      isDisabled: false,
      isActive: false,
      isHover: false,
      isFocus: false
    };
  },

  methods: {

    activate() {

      // Use `Components.extend` to register a handler for your specific use case.

    }

  },

  filters: {},

  created() {

    // Register event listeners if a menu ID was given.
    if( this.menu ) {

      Events.$on(`${this.menu}:activate`, (uid) => {



      });

    }

  }

});
