Components.register('libwizard-form', {

  props: {
    fid: String
  },

  data() {
    return {
      url: "//emory.libwizard.com/form_loader.php?id=:fid&noheader=0"
    };
  },

  mounted() {

    // Load the libwizard form using the given form ID (fid).
    $('<script>', {
      src: this.url.replace(':fid', this.fid)
    }).appendTo(this.$el);

  }

});
