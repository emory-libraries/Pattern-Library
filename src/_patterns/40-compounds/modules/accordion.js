Components.register('accordion', {

  data() {
    return {
      panels: []
    };
  },

  methods: {

    showAll() {

      // Show all panels.
      this.panels.forEach((panel) => {

        // Find the panel's switch, and flip it on.
        $(panel).find('.panel-switch').prop('checked', true);

      });

    },

    hideAll() {

      // Hide all panels.
      this.panels.forEach((panel) => {

        // Find the panel's switch, and flip it off.
        $(panel).find('.panel-switch').prop('checked', false);

      });

    }

  },

  mounted() {

    // Find all accordion panels.
    this.panels = Array.from($(this.$el).find('.accordion-panel'));

  }

});
