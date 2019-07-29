// Register a Tab component.
Components.register('tab', {

  props: {
    menu: {
      type: [String, Number],
      default: null
    },
    value: {
      type: null,
      default: null
    },
    uid: {
      type: String,
      required: true
    }
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

      // Verify that the tab is within an existing menu.
      if( this.menu ) {

        // Indicate to the menu that the activated tab should be changed.
        Events.$emit(`${this.menu}:activated`, {
          uid: this.uid,
          value: this.value,
          initiator: this.uid
        });

      }

    }

  },

  filters: {},

  created() {

    // Register event listeners if a menu ID was given.
    if( this.menu ) {

      // Listen for changes to tab states within the tab menu.
      Events.$on(`${this.menu}:activated`, (data) => {

        // If the activated UID matches the current tab's UID, indicate that the tab is activated.
        if( data.uid === this.uid ) this.isActive = true;

        // Otherwise, deactivate the tab.
        else this.isActive = false;

      });

    }

  }

});
