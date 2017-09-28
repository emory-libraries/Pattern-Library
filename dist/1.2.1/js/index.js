/** 
 * Use this file to build out JS components.
 */


/**
 * Helper Functions
 *
 * These functions are included to help with JS processes.
 */
function parseBool( value ){
  switch(true) {
    case typeof value == 'string':
      value = value.toLowerCase().trim();
      case value == 'true' || value == '1': return true;
      case value == 'false' || value == '0': return false;
    case value === true: return true;
    case value === false: return false;
    case value === 1: return true;
    case value === 0: return false;
    default: return false;
  }
}

/**
 * Copyright()
 *
 * Keeps copyright information current.
 */
var Copyright = function( settings ){
  
  var config = {
    owner: 'Emory University',
    url: "http://www.emory.edu/",
    origin: null,
    phone: "404.727.6123",
    address: "201 Dowman Drive Atlanta, Georgia 30322 USA",
    policy: "http://www.emory.edu/home/about-this-site/copyright.html",
    class: {
      owner: 'copyright-owner',
      policy: 'copyright-policy',
      origin: 'copyright-origin',
      year: 'copyright-year',
      phone: 'copyright-phone',
      address: 'copyright-address'
    }
  };
  
  this.settings = function( settings ){
    return $.extend(true, this.config, settings);
  };
  this.config = config;
  this.config = this.settings( settings );
  this.update = function( settings ){ 
    
    var Copyright = this;
    
    this.settings( settings ); 
    
    if( !this.config.year ){
      this.config.date = new Date();
      this.config.year = Copyright.config.date.getFullYear();
    }

    var $target;
 
    if( Copyright.config.owner ){
      if( ($target = $('.' + Copyright.config.class.owner)).length > 0 ){
        $target.text( Copyright.config.owner );
      }
      if( $target.is('a') && Copyright.config.url ){
        $target.attr('href', Copyright.config.url);
      }
    } 
    if( Copyright.config.policy ){
      if( ($target = $('.' + Copyright.config.class.policy)).length > 0 && $target.is('a') ){
        $target.attr('href', Copyright.config.policy );
      }
    }
    if( Copyright.config.year ){ 
      if( ($target = $('.' + Copyright.config.class.year)).length > 0 ){
        $target.text( Copyright.config.year );
      }
      else {
        if( ($target = $('.' + Copyright.config.class.owner)).length > 0 ){
          $target.before( '<span class="' + Copyright.config.class.year + '">' +
          Copyright.config.year + '</span> ');
        }
      }
    }
    if( Copyright.config.origin ){ 
      if( ($target = $('.' + Copyright.config.class.origin)).length > 0 ){
        $target.text( Copyright.config.origin ).html( $target.html() + '&ndash;' );
      }
      else {
        if( ($target = $('.' + Copyright.config.class.year)).length > 0 ){
          $target.before( '<span class="' + Copyright.config.class.origin + '">' + Copyright.config.origin + '&ndash;</span>'  );
        }
      }
    }
    if( Copyright.config.phone ){
      if( ($target = $('.' + Copyright.config.class.phone)).length > 0 ){ 
        $target.text( Copyright.config.phone );
        if( $target.is('a') ){
          $target.attr('href', 'tel:' + Copyright.config.phone);
        }
      }
    }
    if( Copyright.config.address ){
      if( ($target = $('.'+ Copyright.config.class.address)).length > 0 ){
        $target.text( Copyright.config.address );
      }
    }
    
    return this;
    
  };
  this.update();
  
  return this;
  
};

/**
 * FileChooser()
 *
 * Enables users to select and upload files from their computer.
 */
var FileChooser = function( settings ){
  
  var config = {
    target: 'input[type="file"]',
    multiple: '{count} files selected'
  };
  
  this.settings = function( settings ){
    return $.extend(true, this.config, settings);
  };
  this.config = config;
  this.config = this.settings( settings );
  this.init = function() {
    
    var FileChooser = this;
    
    this.target = $(FileChooser.config.target).each(function(){
    
      var $input = $(this),
          $label = $input.next('label');

      var value = $label.html();

      $input.on('change', function(event){

        var files = $input[0].files,
            file = '';

        if( files && files.length > 1 ) file = (FileChooser.config.multiple || '').replace('{count}', files.length);
        else file = event.target.value.split('\\').pop();

        if( file ) $label.html( file );
        else $label.html( value );

      });
      
    });
    
  };
  this.update = function( settings ){
    
    this.settings( settings ); 
    this.init();
    
  };
  this.init();
  
  // Prevent reinitialization.
  delete this.init;
  
  return this;
  
};

/**
 * Slider()
 *
 * Creates a multimedia slideshow.
 */
var Slider = function( settings ){
  
  // Save the Slider context.
  var Slider = this;
  
  var config = {
    slider: '.slider',
    slides: '.slide',
    duration: 500,
    pause: 5000,
    autoplay: false,
    class: {
      active: 'active',
      next: 'next',
      previous: 'prev',
      toggle: 'toggle',
      indicator: 'indicator'
    },
    direction: {
      next: 'left',
      previous: 'right'
    },
    icon: {
      next: 'fa-chevron-right',
      previous: 'fa-chevron-left'
    }
  };
  
  var $Sliders = $();
  
  var transition = function( $from, $to, transition, callback ){
    
    // Initialize classes and directions.
    var move = Slider.config.class[transition],
        active = Slider.config.class.active,
        direction = Slider.config.direction[transition],
        duration = Slider.config.duration;
    
    // Start transitions.
    $to.addClass( move );
    
    // Allow the transition to occur.
    setTimeout(function(){
      
      $from.addClass( direction );
      $to.addClass( direction );
      
      // Wait for the transition to finish.
      setTimeout(function(){

        $from.removeClass( active + ' ' + direction );
        $to.addClass( active ).removeClass( move + ' ' + direction )

        // Fire the callback.
        if( $.isFunction(callback) ) callback( $to, $from, transition );

      }, duration);
      
    }, 10);
    
  };
  
  var indicate = function( $indicators, index ){
    
    // Unset all active indicators.
    $indicators.parent('li').removeClass( Slider.config.class.active );
    
    // Reset the active indicator.
    $indicators.filter('[data-slide-index="' + index + '"]').parent('li').addClass( Slider.config.class.active );
    
  };
  
  var action = {
    
    first: function( target, event ){},
    
    last: function( target, event ){},
    
    next: function( target, event ){
      
      // Capture the slider, slides, toggles, and indicators.
      var $slider = $(target),
          $slides = $slider.children( Slider.config.slides ),
          $toggles = $slider.children( '.' + Slider.config.class.toggle ),
          $indicators = $slider.children( '.' + Slider.config.class.indicator ).find('button');
      
      // Get the active slide and the next slide.
      var $active = $slides.filter( '.' + Slider.config.class.active ),
          $next = $active[0] != $slides.last()[0] ? $active.next() : $slides.first();
      
      // Temporarily disable the toggles and indicators.
      $toggles.prop('disabled', true);
      $indicators.prop('disabled', true);
      
      // Toggle the indicator.
      indicate( $indicators, $slides.index($next) );

      // Transition the slider.
      transition( $active, $next, 'next', function( $active ){
        
        // Reenable the toggles and indicators.
        $toggles.prop('disabled', false);
        $indicators.prop('disabled', false);
        
        // Signal that the active slide was updated.
        $slider.trigger('slider:active');
      
        // Check if the active slide is first and/or last.
        if( $active[0] = $slides.first()[0] ) $slider.trigger('slider:first');
        if( $active[0] = $slides.last()[0] ) $slider.trigger('slider:last');
        
        // Restart the pause interval if autoplaying.
        if( !event.autoplay && $slider.data('autoplay') ) $slider.trigger('slider:restart');
        
      });
      
    },
    
    prev: function( target, event ){
      
      // Capture the slider, slides, toggles, and indicators.
      var $slider = $(target),
          $slides = $slider.children( Slider.config.slides ),
          $toggles = $slider.children( '.' + Slider.config.class.toggle ),
          $indicators = $slider.children( '.' + Slider.config.class.indicator ).find('button');
      
      // Get the active slide and the previous slide.
      var $active = $slides.filter( '.' + Slider.config.class.active ),
          $previous = $active[0] != $slides.first()[0] ? $active.prev() : $slides.last();
      
      // Toggle the indicator.
      indicate( $indicators, $slides.index($previous) );
      
      // Temporarily disable the toggles and indicators.
      $toggles.prop('disabled', true);
      $indicators.prop('disabled', true);
      
      // Transition the slider.
      transition( $active, $previous, 'previous', function( $active ){
        
        // Reenable the toggles and indicators.
        $toggles.prop('disabled', false);
        $indicators.prop('disabled', false);
        
        // The active slide was updated.
        $slider.trigger('slider:active');
      
        // Check if the active slide is first and/or last.
        if( $active[0] = $slides.first()[0] ) $slider.trigger('slider:first');
        if( $active[0] = $slides.last()[0] ) $slider.trigger('slider:last');
        
        // Restart the pause interval if autoplaying.
        if( !event.autoplay && $slider.data('autoplay') ) $slider.trigger('slider:restart');
        
      });
      
    },
    
    active: function( target, event ){},
    
    start: function( target, event ){ 
      
      // Get the slider.
      var $slider = $(target);
      
      // Trigger a pause.
      $slider.trigger($.Event('slider:pause',{
        target: target
      }));
      
    },
    
    pause: function( target, event ){
      
      // Get the slider.
      var $slider = $(target);
      
      // Get the pause and the duration.
      var pause = $slider.attr( 'data-pause' ),
          duration = Slider.config.duration;
      
      // Give any pause attributes preference, or use the default.
      pause = pause ? parseFloat( pause ) : Slider.config.pause;
      
      // Start an interval.
      $slider.data('autoplay', setInterval(function(){
        
        // Trigger the next slide.
        $slider.trigger($.Event('slider:next',{
          autoplay: true
        }));
        
      }, pause + duration));
      
    },
    
    stop: function( target, event, callback ){
      
      // Get the slider.
      var $slider = $(target);
      
      // Clear the autoplay interval.
      clearInterval( $slider.data('autoplay') );
      
      // Reset the slider's autoplay interval.
      $slider.data('autoplay', null);
      
      // Fire any callbacks.
      if( $.isFunction(callback) ) callback( target, event );
      
    },
    
    restart: function( target, event ){
      
      // Stop the autoplay.
      action.stop( target, event, function(target, event){
        
        // Then, restart the autoplay.
        action.start( target, event );
        
      });
      
    },
    
    jump: function( target, event ){
      
      // Capture the slider, slides, toggles, and indicators.
      var $slider = $(target),
          $slides = $slider.children( Slider.config.slides ),
          $toggles = $slider.children( '.' + Slider.config.class.toggle ),
          $indicators = $slider.children( '.' + Slider.config.class.indicator ).find('button');
      
      // Get the active slide and the jump slide.
      var $active = $slides.filter( '.' + Slider.config.class.active ),
          $jump = $( $slides[event.slide] );
      
      // Exit if the jump slide is the active slide.
      if( $active[0] == $jump[0] ) return false;
      
      // Determine the slide order.
      var direction = $slides.index( $active ) > $slides.index( $jump ) ? 'previous' : 'next';
      
      // Temporarily disable the toggles and indicators.
      $toggles.prop('disabled', true);
      $indicators.prop('disabled', true);
      
      // Toggle the indicator.
      indicate( $indicators, event.slide );
      
      // Transition the slider.
      transition( $active, $jump, direction, function( $active ){
        
        // Reenable the toggles and indicators.
        $toggles.prop('disabled', false);
        $indicators.prop('disabled', false);
        
        // The active slide was updated.
        $slider.trigger('slider:active');
      
        // Check if the active slide is first and/or last.
        if( $active[0] = $slides.first()[0] ) $slider.trigger('slider:first');
        if( $active[0] = $slides.last()[0] ) $slider.trigger('slider:last');
        
        // Restart the pause interval if autoplaying.
        if( !event.autoplay && $slider.data('autoplay') ) $slider.trigger('slider:restart');
        
      });
      
    }
    
  };
  
  this.settings = function( settings ){
    return $.extend(true, this.config, settings);
  };
  this.config = config;
  this.config = this.settings( settings );
  this.count = function( filter ) {
    
    // Capture the count for all sliders.
    var count = [];
    
    // Initialize the filter.
    filter = filter || '*';
    
    $Sliders.filter( filter ).each(function(){
      count.push( $(this).children(Slider.config.slides).length );
    });
    
    return count;
    
  };
  this.autoplay = function() {
    
    // Capture arguments.
    var args = Array.from( arguments );

    // Initialize filter and autoplay value.
    var filter = args.length > 0 ? args[0] : '*',
        autoplay = args.length > 1 ? args[1] : null;
    
    // Loop through sliders.
    $Sliders.filter( filter ).each(function(){
      
      // Capture the current slider.
      var $slider = $(this);
      
      // Initialize attribute.
      var attribute = $slider.attr( 'data-autoplay' );
      
      // Give passed arguments priority, then attributes, then default.
      var autoplay = autoplay ? autoplay : attribute ? parseBool(attribute) : Slider.config.autoplay;
      
      // Enable autoplay.
      if( autoplay ) $slider.trigger('slider:start');
      
    });
    
    return this;
    
  };
  this.toggles = function( state, filter ) {
    
    // Initialize the filter.
    filter = filter || '*';
    
    // Loop through sliders.
    $Sliders.filter( filter ).each(function(){
      
      // Capture the slider.
      var $slider = $(this);
      
      // Get the toggle classes.
      var toggle = Slider.config.class.toggle,
          next = Slider.config.class.next,
          previous = Slider.config.class.previous;
      
      // Check for existing toggles.
      var $next = $slider.find( '.' + next ),
          $previous = $slider.find( '.' + previous );
      
      // Exit if both toggles already exist.
      if( $next.length > 0 && $previous.length > 0 ) return true;
      
      // Otherwise, create a next toggle.
      if( $next.length === 0 ) {
        
        $next = $('<button>', {
          class: toggle + ' ' + next,
          html: '<span class="' + Slider.config.icon.next + '" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>'
        }).on('click', function(){ 
          $slider.trigger('slider:next');
        }).appendTo( $slider );
        
      }
      
      // Otherwise, create a previous toggle.
      if( $previous.length === 0 ) {
        
        $previous = $('<button>', {
          class: toggle + ' ' + previous,
          html: '<span class="' + Slider.config.icon.previous + '" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>'
        }).on('click', function(){ 
          $slider.trigger('slider:prev');
        }).prependTo( $slider );
        
      }
      
    });
    
    return this;
    
  };
  this.indicators = function( state, filter ) {
    
    // Initialize the filter.
    filter = filter || '*';
    
    // Loop through sliders.
    $Sliders.filter( filter ).each(function(){
      
      // Capture the slider and its slides.
      var $slider = $(this),
          $slides = $slider.children( Slider.config.slides );
      
      // Get the indicator classes.
      var indicator = Slider.config.class.indicator,
          next = Slider.config.class.next,
          previous = Slider.config.class.previous;
      
      // Check for existing indicators.
      var $indicators = $slider.find( '.' + indicator );
      
      // Remove any existing indicators.
      $indicators.remove();
      
      // Start building the indicators.
      $indicators = $('<ul>',{ 
        class: indicator 
      });
      
      // Add an indicator for each slide.
      $slides.each(function(i){
        
        // Create an indicator.
        var $indicator = $('<button>', {
          'data-slide-index': i,
        }).on('click', function(){
          $slider.trigger($.Event('slider:jump',{
            slide: i
          }));
        });
        
        // Add the indicator to the stack.
        $indicators.append( 
          $('<li>').append( $indicator )
        );
        
      });
      
      // Add the indicators to the slider.
      $slider.append( $indicators );
      
    });
    
    return this;
    
  };
  this.init = function(){
    
    // Capture all sliders, and load their event handlers.
    $Sliders = $( Slider.config.slider )
    
      // First slide reached.
      .on('slider:first', function(event){
        action.first(this, event);
      })
    
      // Last slide reached.
      .on('slider:last', function(event){
        action.last(this, event);
      })
    
      // Next slide called.
      .on('slider:next', function(event){
        action.next(this, event);
      })
    
      // Previous slide called.
      .on('slider:prev', function(event){
        action.prev(this, event);
      })
    
      // Active slide changed.
      .on('slider:active', function(event){
        action.active(this, event);
      })
    
      // Autoplay restarted.
      .on('slider:restart', function(event){
        action.restart(this, event);
      })
    
      // Autoplay started.
      .on('slider:start', function(event){
        action.start(this, event);
      })
    
      // Autoplay paused momentarily.
      .on('slider:pause', function(event){
        action.pause(this, event);
      })
      
      //  Autoplay stopped.
      .on('slider:stop', function(event){
        action.stop(this, event);
      })
    
      // Jump to slide fired.
      .on('slider:jump', function(event){
        action.jump(this, event);
      });
    
    // Load toggles and indicators.
    Slider.toggles(true).indicators(true);
    
    // Always start on the first slide.
    $Sliders.each(function(){
      
      // Capture the slider, slides, and indicators.
      var $slider = $(this),
          $slides = $slider.children( Slider.config.slides ),
          $indicators = $slider.children( '.' + Slider.config.class.indicator ).find('li');
      
      // Remove the active class from all slides, then only add it to the first one.
      $slides.removeClass( Slider.config.class.active ).first().addClass( Slider.config.class.active );
      
      // Add the active class to the first indicator.
      $indicators.first().addClass( Slider.config.class.active );
      
      // Trigger the first event on the slider.
      $slider.trigger('slider:first');
      
    });
    
    // Initialize autoplay.
    Slider.autoplay();
    
  };
  this.init();
  
  // Prevent reinitialization.
  delete this.init;
  
  return this;
  
};

/**
 * document.ready()
 *
 * Fires when the document is ready.
 */
$(function(){
  
  var copyright = new Copyright({ origin: 2013 });
  
  var filechooser = new FileChooser();
  
  var slider = new Slider();
  
});