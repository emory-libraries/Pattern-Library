// Register a Button component.
Components.register('subnav-resource', {

  props: {},

  data() {
    return {
      isDisabled: false,
      isActive: false,
      isHover: false,
      isFocus: false,
      toggle: null
    };
  },

  methods: {

    show() {

      // Show the button options.
      $(this.toggle).prop('checked', true);

    },

    hide() {

      // Hide the button options.
      $(this.toggle).prop('checked', false);

    }

  },

  filters: {},

  mounted() {

    // Find the toggle.
    this.toggle = $(this.$el).find('.subnav-button-options-toggle');

  }

});
