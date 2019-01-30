// Load dependencies.
const Clipboard = require('clipboard');
const Tippy = require('tippy.js');
const $ = require('jquery');

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
