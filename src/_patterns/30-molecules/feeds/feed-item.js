Components.register('feed-item', {

  data() {
    return {
      id: null,
      title: null,
      date: null,
      link: {
        href: null,
        target: '_self'
      },
      button: {
        href: null,
        label: null,
        target: '_self'
      }
    };
  }

});
