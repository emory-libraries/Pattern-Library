// Load dependencies.
const moment = require('moment');
const _ = require('lodash');

// Suppress moment warnings.
moment.suppressDeprecationWarnings = true;

// Initialize helpers methods.
const helpers = {
  
  // Determine if a value is numeric.
  isNumeric: ( value ) => !isNaN(parseFloat(value)) && isFinite(value),
  
  // Determine if a value is an array.
  isArray: ( value ) => /^\[/.test(value.split('\n').join('')) && /\]$/.test(value.split('\n').join('')),
  
  // Determine if a value is an object.
  isObject: ( value ) => /^\{/.test(value.split('\n').join('')) && /\}$/.test(value.split('\n').join('')),
  
  // Determine if a value is a list.
  isList: ( value ) => /^([^.?!]+?[,;] ?)+([^.?!]+)$/.test(value),
  
  // Determine if a value is a date.
  isDate( value ) {
    
    // Try to convert the value to a date.
    try {
      
      // Attempt to parse the date.
      const date = moment(value);
      
      // Indicate the date's validity.
      return date.isValid();
      
    }
    
    // Otherwise, assume it's not a date.
    catch(e) {
      
      return false;
      
    }
    
  }
  
};

// Create a utility method for inferring a value's data type.
const type = function( value ) {
  
  // Check numeric types.
  if( helpers.isNumeric(value) ) return value.indexOf('.') > -1 ? 'float': 'int';
  
  // Check date types.
  else if( helpers.isDate(value) ) return 'date';
  
  // Check array types.
  else if( helpers.isArray(value) ) return 'array';
  
  // Check object types.
  else if( helpers.isObject(value) ) return 'object';
  
  // Check list types.
  else if( helpers.isList(value) ) return 'list';
  
  // Check boolean types.
  else if( ['true', 'false'].includes(value) ) return 'bool';
  
  // Check null types.
  else if( value == 'null' ) return 'null';
  
  // Check undefined types.
  else if( value == 'undefined' ) return 'undefined';
  
  // Check NaN types.
  else if( value == 'NaN' ) return 'NaN';
  
  // Otherwise, use string.
  return 'string';
  
};

// Create a utility method for casting values to their inferred data type.
const cast = function( value, deep = true ) {
  
  // Cast by type.
  switch( type(value) ) {
    
    // Cast objects.
    case 'object': return value.replace(/^\{/, '').replace(/\}$/, '').split(',').map((item) => item.split(':')).reduce((object, item) => {

      // Get key and value.
      const key = item[0].trim().replace(/^['"]/, '').replace(/['"]$/, '');
      const value = item[1].trim().replace(/^['"]/, '').replace(/['"]$/, '');
      
      // Set key and value.
      object[key] = deep ? cast(value) : value;
      
      // Continue reducing.
      return object;
      
    }, {});
      
    // Cast arrays.
    case 'array': return value.replace(/^\[/, '').replace(/\]$/, '').split(',').map((item) => deep ? cast(item.trim()) : item.trim());
      
    // Cast list.
    case 'list': return value.split(/[,;]/).map((item) => deep ? cast(item) : item);
      
    // Cast integers.
    case 'int': return parseInt(value);
      
    // Case floats.
    case 'float': return parseFloat(value);
      
    // Case booleans.
    case 'bool': return value == 'true' ? true : false;
      
    // Cast nulls.
    case 'null': return null;
      
    // Cast undefineds.
    case 'undefined': return undefined;
      
    // Case NaNs.
    case 'NaN': return NaN;
      
    // Otherwise, do nothing.
    default: return value;
    
  }
  
};

// Export the utility.
module.exports = cast;