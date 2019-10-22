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
        if( data.uid === this.uid ) {

          // Update the tab's state to active.
          this.isActive = true;

          // Then, make sure the tab input's checked state reflects the tab's active state.
          this.input.prop('checked', true);

        }

        // Otherwise, deactivate the tab.
        else {

          // Update the tab's state to inactive.
          this.isActive = false;

          // Then, make sure the tab input's checked state reflects the tab's inactive state.
          this.input.prop('checked', false);

        }

      });

    }

  },

  mounted() {



  },

  computed: {

    input() {

      // Locate the tab's input.
      return $(`#${this.uid}`);

    }

  }

});
