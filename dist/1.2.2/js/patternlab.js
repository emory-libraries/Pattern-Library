/**
 * Pattern Lab specific JS functionality.
 */

// Helper functions.
function isset( value ) {
  return value !== undefined && value !== null && value != '';
};

// Extend objects.
String.prototype.repeat = function( n ){
  
  n = n || 1;
  
  return Array( n + 1 ).join(this);
  
};
Number.prototype.pad = function( n, x ){
  
  // Default padding to "0".
  x = x || "0";
  
  if( this.toString().length >= n ) return this;
  
  return x.repeat( n - this.toString().length ) + this.toString();
  
};
Date.prototype.adjust = function( adjustment ){
  
  // Capture the date.
  var date = new Date( this );
  
  // Capture the direction of the adjustment.
  var increment = adjustment.indexOf('-') === 0 ? false : true;
  
  // Remove the directional character if applicable.
  adjustment.replace(/[+-]/, '');
  
  // Split the remaining adjustments.
  adjustment = adjustment.split(' ');
  
  // Convert the first adjust to a number.
  adjustment[0] = +adjustment[0];
  
  // Increment the date.
  if( increment ) {
    
    switch( adjustment[1] ) {
      case 'month':
      case 'months':
        date.setMonth(date.getMonth() + adjustment[0]);
        break;
      case 'year':
      case 'years':
        date.setYear(date.getYear() + adjustment[0]);
        break;
      case 'hour':
      case 'hours':
        date.setHours(date.getHours() + adjustment[0]);
        break;
      case 'minute':
      case 'minutes':
        date.setMinutes(date.getMinutes() + adjustment[0]);
        break;
      case 'second':
      case 'seconds':
        date.setSeconds(date.getSeconds() + adjustment[0]);
        break;
      case 'millisecond':
      case 'milliseconds':
        date.setMilliseconds(date.getMilliseconds() + adjustment[0]);
        break;
      default:
        date.setDate(date.getDate() + adjustment[0]);
        
    }
    
  }
  
  // Decrement the date.
  else {
    
    switch( adjustment[1] ) {
      case 'month':
      case 'months':
        date.setMonth(date.getMonth() - adjustment[0]);
        break;
      case 'year':
      case 'years':
        date.setYear(date.getYear() - adjustment[0]);
        break;
      case 'hour':
      case 'hours':
        date.setHours(date.getHours() - adjustment[0]);
        break;
      case 'minute':
      case 'minutes':
        date.setMinutes(date.getMinutes() - adjustment[0]);
        break;
      case 'second':
      case 'seconds':
        date.setSeconds(date.getSeconds() - adjustment[0]);
        break;
      case 'millisecond':
      case 'milliseconds':
        date.setMilliseconds(date.getMilliseconds() - adjustment[0]);
        break;
      default:
        date.setDate(date.getDate() - adjustment[0]);
        
    }
    
  }
  
  return date;
  
};

// Create a private scope.
patternLab = (function( $ ){
  
  // Define defaultconfigurations.
  var config = {
    clock: {
      format: 12
    },
    clipboard: {
      target: '.sg-copy-here, .sg-copy-button',
      icon: {
        default: 'fa-clipboard',
        success: 'fa-check',
        error: 'fa-times',
        duration: 500
      }
    },
    alerts: {
      target: '.sg-alert',
      speed: 1000
    }
  };
  
  // Define tasks to be run on initalization.
  var tasks = {
    
    // Create a running clock.
    clock: function(){
      
      // Toggle the clock's running state.
      public.clock.running = true;
      
      // Invoke the clock.
      clock();
      
    },
    
    // Initialize [Clipboard](clipboard.js)
    clipboard: function(){
      
      // Create a new Clipboard.
      var clipboard = new Clipboard( config.clipboard.target );

      // Load Clipboard icons.
      $( config.clipboard.target ).each(function(){
        
        if( !$(this).hasClass(config.clipboard.icon.default) ) $(this).addClass(config.clipboard.icon.default);
        if( !$(this).hasClass('default') ) $(this).addClass('default');
        
      });

      // Handle Clipboard events.
      clipboard.on('success', function(event){

        $(event.trigger).removeClass(config.clipboard.icon.default + ' default')
                        .addClass(config.clipboard.icon.success + ' success');

        setTimeout(function(){

          $(event.trigger).removeClass(config.clipboard.icon.success + ' success')
                         .addClass(config.clipboard.icon.default + ' default');

        }, config.clipboard.icon.duration + 1);

      }).on('error', function(event){

        $(event.trigger).removeClass(config.clipboard.icon.default + ' default')
                        .addClass(config.clipboard.icon.error + ' error');

        setTimeout(function(){

          $(event.trigger).removeClass(config.clipboard.icon.error + ' error')
                         .addClass(config.clipboard.icon.default + ' default');

        }, config.clipboard.icon.duration + 1);

      });
      
      // Save the Clipboard to the public scope.
      public.clipboard = clipboard;
      
    },
    
    // Initialize alerts.
    alerts: function(){
      
      // Retrieve alerts
      var $alerts = $( config.alerts.target );
      
      // Hide all alerts by default.
      $alerts.hide();
      
      // Setup each alert.
      $alerts.each(function(){
        
        // Capture the current alert.
        var $alert = $(this);
        
        // Capture inactive and expired alerts immediately.
        var active = true, expired = false;
        
        // Look for a start date, duration, and/or end date.
        var start = $alert.attr('data-start'),
            duration = $alert.attr('data-duration'),
            end = $alert.attr('data-end');
        
        // Initialize a date comparison function.
        var compareNow = function( date, comp ){
        
          // Get the current date and time.
          var now = new Date();

          // Compare the two dates.
          switch( comp ) {
            case '<': return date < now;
            case '>': return date > now;
            case '<=': return date <= now;
            case '>=': return date >= now;
            default: return date === now;
          }

        };
        
        // Handle start dates.
        if( active && !expired && isset(start) ) {
          
          // Capture the start date.
          start = new Date( start );
          
          // Show alerts with a start date <= the current date. 
          if( compareNow( start, '<=' ) ) { 
            
            $alert.fadeIn( config.alerts.speed );
            
          }
          
          // Show future alerts as they become available.
          else {
            
            active = false;
            
            $alert.data('start', setInterval(function(){
              
              if( compareNow( start, '<=') ) {
                
                active = true;
                
                clearInterval( $alert.data('start') );
                
                $alert.show( config.alerts.speed );
                
              }
              
            }, 1000));
            
          }
          
          // Handle durations.
          if( isset(duration) ) {
            
            // Get the future end date.
            var stop = start.adjust( duration );
            
            // Hide alerts that have reached their stop date.
            if( active && compareNow( stop, '<=') ) {
              
              $alert.fadeOut( config.alerts.speed, function(){
                    
                $alert.remove();

              });
              
            }
            
            // Stop alerts in the future.
            else {
              
              $alert.data('stop', setInterval(function(){
              
                if( compareNow( stop, '<=') ) {
                  
                  active = false;
                  expired = true;
                  
                  clearInterval( $alert.data('stop') );

                  $alert.fadeOut( config.alerts.speed, function(){
                    
                    $alert.remove();
                    
                  });

                }

              }, 1000));
              
            }
            
          }
          
        }
        
        // Handle end dates.
        if( active && !expired && isset(end) ) {
 
          // Capture the end date.
          end = new Date( end );
          
          // Remove alerts when they have expired.
          if( compareNow( end, '<=') ) {
            
            active = false;
            expired = true;
            
            $alert.remove();
            
          }
          
          // Force alerts to expire on their end date.
          else {
            
            $alert.data('end', setInterval(function(){
              
              if( compareNow( end, '<=') ) {
                
                active = false;
                expired = true;
                
                clearInterval( $alert.data('end') );
                
                $alert.remove();
                
              }
              
            }, 1000));
            
          }
          
        }
        
        // Delete expired alerts.
        if( !active && expired ) {
          
          $alert.remove();
          
        }
        
        // Show active alerts.
        else if( active ) {
          
          $alert.show( config.alerts.speed );
          
        }
        
        
      });
      
    }
    
  };
  
  // Initialize a clock.
  var clock = function(){
    
    // Get the current date and time.
    var date = new Date();

    // Extract the hours, minutes, and seconds.
    var time = {
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
    };
    
    // Set AM or PM.
    if( time.h >= 12 ) {
      time.pm = true; 
      time.am = false;
    }
    else {
      time.am = true; 
      time.pm = false;
    }
    
    // Convert to the desired format.
    if( config.clock.format == 12 ) {
      
      if( time.h > 12 ) time.h -= 12;
      
    }
    
    // Create a user-friendly time.
    time.time = time.h + ':' + time.m.pad(2) + ':' + time.s.pad(2);

    // Erase the time from the date.
    date.setHours(0, 0, 0, 0);

    // Save date and time.
    public.clock.date = date;
    public.clock.time = time;

    // Keep the clock running
    if( public.clock.running === true ) setTimeout(clock, 500);
    
  };
  
  // Create a public scope.
  var public = {
    clock: {
      date: null,
      time: null,
      running: false,
      format: null
    }
  };
  
  // Enable initialization when ready.
  return {
    
      // Allow initialization at a later point.
    init: function( options ){
      
      // Deep merge options with configuarations.
      config = $.extend(true, config, options);
      
      // Run tasks.
      for(var task in tasks){
        if( $.isFunction(tasks[task]) ) tasks[task]();
      }
      
      // Make configurations public.
      public.config = config;
      
      // Return the public scope.
      return public;
      
    }
    
  };
  
})( jQuery );

// Initialize on document ready.
$(function(){
  
  patternLab.init();
  
});
