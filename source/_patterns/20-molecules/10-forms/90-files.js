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
  
  return this;
};

/**
 * document.ready()
 *
 * Fires when the document is ready.
 */
$(function(){
  
  var filechooser = new FileChooser();
  
});