Components.register('slider', {

  data() {
    return {
      slides: 0,
      active: 0,
      hammer: null,
    };
  },

  methods: {

    previous() {

      // Toggle the previous slide.
      if( this.active > 0 ) this.active--;

    },

    backward() {

      // Move backward in the slide order.
      if( this.active > 0 ) this.active--;

      // Otherwise, go to the last slide.
      else  this.active = this.slides - 1;

      // Move the focus to active indicator.
      $(this.indicators[this.active]).focus();


    },

    next() {

      // Toggle the next slide.
      if( this.active < this.slides - 1 ) this.active++;

    },

    forward() {

      // Move forward in the slide order.
      if( this.active < this.slides -1 ) this.active++;

      // Otherwise, go to the first slide.
      else  this.active = 0;

      // Move the focus to active indicator.
      $(this.indicators[this.active]).focus();

    }

  },

  mounted() {

    // Enable touch events.
    this.hammer = new Hammer(this.$el);

    // Setup swipe events on the slider.
    this.hammer.on('swipe', (event) => {

      // Go to the previous slide when a right swipe occurs.
      if( event.direction === Hammer.DIRECTION_RIGHT ) this.previous();

      // Go to the next slide when a left swipe occurs.
      if( event.direction === Hammer.DIRECTION_LEFT ) this.next();

    });

    // Setup scroll events on the slider.
    $(this.$el).on('scroll', (event) => console.log(event));

  },

  computed: {

    indicators() {

      // Get all indicators.
      return _.toArray($(this.$el).find('.slider-indicator'));

    }

  }

});
