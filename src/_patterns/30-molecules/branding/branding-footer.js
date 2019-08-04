// Register a Branding Footer component.
Components.register('branding-footer', {

  data() {
    return {
      selection: ''
    };
  },

  methods: {

    redirect() {

      // Ignore empty selections.
      if( _.isNil(this.selection) || this.selection === '' ) return;

      // Get the location of the targeted site.
      const href = `//${this.selection}`;

      // Redirect the site to the target location.
      window.location.href = href;

    }

  }

});