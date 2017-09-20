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
 * document.ready()
 *
 * Fires when the document is ready.
 */
$(function(){
  
  var copyright = new Copyright({ origin: 2013 });
  
});