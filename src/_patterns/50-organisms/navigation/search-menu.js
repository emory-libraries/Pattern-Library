// Register a Search Menu component.
Components.register('search-menu', {

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

    change($event) {}

  },

  filters: {},

  created() {}

});