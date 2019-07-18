// Register a Navigation Menu component.
Components.register('nav-menu', {

  props: {},

  data() {
    return {
      toggles: [],
      delay: 100
    };
  },

  methods: {

    open($event) {

      // Locate the element that triggered the the event.
      let element = $($event.target);

      // Capture the nearest button.
      let button;

      // Always check for navigation groups, and if found, update the element and button.
      if( element.closest('.nav-menu-main-nav-group').length > 0 ) {

        element = element.closest('.nav-menu-main-nav-group').first();
        button = element.children('.nav-button').first();

      }

      // For navigation groups, locate the nearest button.
      else if( element.is('.nav-menu-main-nav-group') ) button = element.children('.nav-button').first();

      // Locate the nearest navigation button.
      else if( element.is('.nav-button') ) button = element;

      // For all other elements, find the proper element, then locate the nearest button.
      else {

        element = element.closest('.subnav-menu-main, .nav-button').first();
        button = element.is('.nav-button') ? element : element.prev('.nav-button');

      }

      // For navigation groups, locate the nearest button.
      if( element.is('.nav-menu-main-nav-group') ) button = element.children('.nav-button').first();

      // Locate the button's target toggle.
      const toggle = this.toggles.filter(`[id="${button.attr('for')}"]`);

      // Indicate the element that toggled the button.
      toggle.data('toggled-by', element);

      // Open the subnavigation dropdown menu for that button.
      toggle.prop('checked', true);

    },

    close($event) {

      // Locate the element that triggered the the event.
      let element = $($event.target);

      // Capture the nearest button.
      let button;

      // Always check for navigation groups, and if found, update the element and button.
      if( element.closest('.nav-menu-main-nav-group').length > 0 ) {

        element = element.closest('.nav-menu-main-nav-group').first();
        button = element.children('.nav-button').first();

      }

      // For navigation groups, locate the nearest button.
      else if( element.is('.nav-menu-main-nav-group') ) button = element.children('.nav-button').first();

      // Locate the nearest navigation button.
      else if( element.is('.nav-button') ) button = element;

      // For all other elements, find the proper element, then locate the nearest button.
      else {

        element = element.closest('.subnav-menu-main, .nav-button').first();
        button = element.is('.nav-button') ? element : element.prev('.nav-button');

      }

      // Locate the button's target toggle.
      const toggle = this.toggles.filter(`[id="${button.attr('for')}"]`);

      // Use a slight delay before closing dropdown menus.
      setTimeout(() => {

        // Close the subnavigation dropdown menu for that button if not toggled by another element.
        if( toggle.data('toggled-by').is(element) ) toggle.prop('checked', false);

      }, this.delay);

    }

  },

  filters: {},

  mounted() {

    // Find the toggles.
    this.toggles = $(this.$el).children('.input.-toggle');

  }

});
