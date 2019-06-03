// Load dependencies.
const Clipboard = require('clipboard');
const Tippy = require('tippy.js');
const jQuery = require('jquery');
const $ = jQuery;
const moment = require('moment');

// Export globals.
global.$ = global.jQuery = $;

// Load libraries.
require('velocity-animate');

// Initialize Clipboard.
new Clipboard('.copy');

// Initialize Tippy.
Tippy('.copy', {
  trigger: 'manual',
  placement: 'bottom',
  arrow: true
});

// Setup tooltips for copy buttons.
$('.copy').each((i, copier) => {

  // Create tooptip events.
  $(copier)

  // Prompt users to copy by clicking.
  .on('mouseenter focus', () => {

    copier._tippy.setContent('Click to Copy');
    copier._tippy.show();
    $(copier).on('mouseleave blur', () => copier._tippy.hide());

  })

  // Let users know that the item was copied when clicked.
  .on('click', () => {

    $(copier).off('mouseleave blur');
    copier._tippy.setContent('Copied!');
    copier._tippy.show();
    $(copier._tippy.popper).addClass('-success');
    setTimeout(() => {
      $(copier._tippy.popper).removeClass('-success');
      copier._tippy.hide();
    }, 1000);

  });

});

// Always reset session data.
Store.wipe();

// Create sample method for Button component.
Components.extend('button', {

  methods: {

    click() {

      // Shake the button.
      $(this.$el)
        .velocity({rotateZ: -5}, {duration: 100})
        .velocity({rotateZ: 5}, {duration: 100})
        .velocity({rotateZ: -5}, {duration: 100})
        .velocity({rotateZ: 5}, {duration: 100})
        .velocity({rotateZ: -5}, {duration: 100})
        .velocity({rotateZ: 5}, {duration: 100})
        .velocity({rotateZ: 0}, {duration: 100});

    }

  }

});

// Create sample method for Tab component.
Components.extend('tab', {

  data() {
    return {
      showing: false,
      tooltip: null,
      timeout: 2000
    };
  },

  methods: {

    click() {

      // See if the tooltip is showing.
      if( this.showing === false ) {

        // Show the tooltip.
        this.tooltip.show();

        // Set the flag.
        this.showing = true;

        // Automatically hide the tooltip.
        setTimeout(() => {

          // Hide the tooltip.
          this.tooltip.hide();

          // Reset the flag.
          this.showing = false;

        }, this.timeout);

      }

    }

  },

  mounted() {

    // Create a tooltip.
    this.tooltip = Tippy.one(this.$el, {
      content: 'This would do something when clicked...',
      placement: 'right',
      arrow: true,
      trigger: 'manual'
    });

  }

});

// Create sample element(s) for Subnav-Viewall component.
Components.extend('subnav-viewall', {

  mounted() {

    // Insert a sample overflow to help demonstrate how the component works.
    [
      $('<input>', {
        type: 'checkbox',
        id: 'pl-overflow-example',
        class: 'subnav-button-overflow-toggle'
      }),
      $('<div>', {
        class: 'subnav-button-overflow pl-callout',
        html: 'This would toggle some overflown content...'
      })
    ].forEach((el) => el.insertBefore(this.$el));

  }

});

// Create sample element(s) for Filter-Search component.
Components.extend('filter-search', {

  mounted() {

    // Add some data to our search filter to demo it.
    if( $(this.$el).closest('#atoms-filter-search').length > 0 ) {

      // Insert a sample list to help demonstrate how the component works.
      const $list = $('<ul>').insertAfter(this.$el);

      // Populate the list using our index items.
      this.fuzzy.populate($list, {
        template: '<li>:service</li>'
      });

    }

  }

});

// Create sample element(s) for Filter-Dropdown component.
Components.extend('filter-dropdown', {

  mounted() {

    // Add some data to our dropdown filter to demo it.
    if( $(this.$el).closest('#atoms-filter-dropdown').length > 0 ) {

      // Insert a sample list to help demonstrate how the component works.
      const $list = $('<div>', {
        class: 'pl-grid'
      }).css({
        '--columns-l': '2',
        '--columns-m': '1',
        '--columns-s': '1',
      }).insertAfter(this.$el);

      // Populate the list using our index items.
      this.fuzzy.populate($list, {
        template: `
        <div class="pl-block">
          <h5 class="pl-title">:title</h6>
          <p class="pl-date">:date</p>
          <p class="pl-description">:description</p>
        </div>`,
        css: {margin: 0}
      });

    }

  }

});

// Create sample element(s) for Filter-Button component.
Components.extend('filter-button', {

  mounted() {

    // Insert a sample list to help demonstrate how the component works.
    const $list = $('<div>', {
      class: 'pl-grid'
    }).css({
      '--columns-l': '5',
      '--columns-m': '3',
      '--columns-s': '2',
      margin: '25px 0'
    }).insertAfter(this.$el);

    // Populate the list using our index items.
    this.fuzzy.populate($list, {
      template: `
      <div class="pl-block">
        <p class="pl-title">:title</p>
      </div>`,
      css: {
        margin: 0,
        'font-size': '12px',
        'text-align': 'center'
      }
    });

  }

});

// Create sample handler for Alert component.
Components.extend('alert', {

  methods: {

    dismiss() {

      // Dismiss the alert.
      this.state.dismissed = true;

      // Save the alert's state.
      Store.set(`alerts.${this.uid}`, this.state);

      // Make the alert reappear after a few seconds.
      setTimeout(() => {

        // Reset the alert state.
        this.state.dismissed = false;

        // Save the state.
        Store.set(`alerts.${this.uid}`, this.state);

      }, 5000);

    }

  }

});

// Create sample handler for Notification component.
Components.extend('notification', {

  methods: {

    dismiss() {

      // Dismiss the notification.
      this.state.dismissed = true;

      // Save the notification's state.
      Store.set(`notifications.${this.uid}`, this.state);

      // Make the notification reappear after a few seconds.
      setTimeout(() => {

        // Reset the notification state.
        this.state.dismissed = false;

        // Save the state.
        Store.set(`notifications.${this.uid}`, this.state);

      }, 5000);

    }

  }

});

// Prevent errors by forcing Vue to ignore Pattern Lab data.
$('.sg-pattern-data').attr('v-pre', true);

// Capture Vue instances.
const PatternLibrary = [];

// Initialize a Vue instance for each pattern.
$('.sg-pattern').each((i, el) => PatternLibrary.push(new Vue({el})));

// Otherwise, dynamically add a Vue instance for individual patterns.
if( $('.sg-pattern').length === 0 ) {

  // Add a wraper to the body that can be used to create a Vue instance.
  $('body').children().not('script').not('style').wrap($('<div>', {
    id: 'vue'
  }));

  // Create the Vue instance.
  PatternLibrary.push(new Vue({el: '#vue'}));

}
