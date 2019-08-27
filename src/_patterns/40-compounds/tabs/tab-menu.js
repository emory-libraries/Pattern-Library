// Register a Tab component.
Components.register('tab-menu', {

  props: {
    uid: {
      type: String,
      required: true
    },
    relay: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      selected: false
    };
  },

  methods: {

    change($event) {

      // When the dropdown is changed, indicate that a new tab menu item should be activated.
      Events.$emit(`${this.uid}:activated`, {
        uid: this.selected.uid,
        value: this.selected.value,
        initiator: this.uid
      });

    }

  },

  filters: {},

  created() {

    // Listen for changes to tab states within the tab menu.
    Events.$on(`${this.uid}:activated`, (data) => {

      // If a relay was given, then relay the data to the targeted relay element.
      if( this.relay ) {

        // Relay the data to the targeted relay element.
        Events.$emit(`${this.relay}:relay`, {
          uid: this.uid,
          value: data.value
        });

      }

      // If the tab menu was not the initiator of the event, then also update the selected tab menu item.
      if( data.initiator !== this.uid ) this.selected = {
        uid: data.uid,
        value: data.value
      };

    });

  }

});
