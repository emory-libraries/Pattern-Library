// Load dependencies.
const type = require('type-of');
const _ = require('lodash');

// Export helpers.
module.exports = {

  // Filter an array of objects to extract only items containing a given key-value pair.
  filterWhere( arrayOfObjects, key, value, comparator ) {

    // Ignore non-arrays.
    if( type(arrayOfObjects) != 'array' ) return [];

    // Extract all objects within the array.
    let objects = arrayOfObjects.filter((item) => type(item) == 'object');

    // Ignore arrays that don't contain any objects.
    if( objects.length === 0 ) return [];

    // Parse the keys, which may have been passed in dot-delimited notation.
    const keys = key.split('.');

    // Set the comparator to equals by default.
    if( !['==', '===', '>', '>=', '<', '<='].includes(comparator) ) comparator = '==';

    // Filter the objects by key-value pair.
    objects = objects.filter((object) => {

      // Initialize a pointer.
      let pointer = object;

      // Move the pointer according to keys.
      for( key of keys ) {

        // Exit if the key does not exist.
        if( !pointer[key] ) return false;

        // Otherwise, move the pointer.
        pointer = pointer[key];

      }

      // Verify that the values passes the comparison.
      switch(comparator) {
        case '===': return pointer === value;
        case '>': return pointer > value;
        case '>=': return pointer >= value;
        case '<': return pointer < value;
        case '<=': return pointer <= value;
        default: return pointer == value;
      }

    });

    // Return the result.
    return objects;

  },

  // Filter an array of objects to extract only items containing a given key.
  filterHas( arrayOfObjects, key ) {

    // Ignore non-arrays.
    if( type(arrayOfObjects) != 'array' ) return [];

    // Extract all objects within the array.
    let objects = arrayOfObjects.filter((item) => type(item) == 'object');

    // Ignore arrays that don't contain any objects.
    if( objects.length === 0 ) return [];

    // Parse the keys, which may have been passed in dot-delimited notation.
    const keys = key.split('.');

    // Filter the objects by key.
    objects = objects.filter((object) => {

      // Initialize a pointer.
      let pointer = object;

      // Move the pointer according to keys.
      for( key of keys ) {

        // Exit if the key does not exist.
        if( !pointer[key] ) return false;

        // Otherwise, move the pointer.
        pointer = pointer[key];

      }

      // Pass if all keys were found.
      return true;

    });

    // Return the result.
    return objects;

  },

  // Get the index of an item within an array.
  indexOf( array, item ) {

    // Get the index.
    const index = _.findIndex(array, item);

    // Return the index or false when not found instead of -1.
    return index < 0 ? false : index;

  },

  // Group items within an arry of objects by a given key.
  keyBy( arrayOfObjects, key ) {

    return _.keyBy(arrayOfObjects, key);

  },

  // Create an array from the given values.
  makeArray( ...values ) {

    return _.initial(values);

  },

  // Condense an array of arrays to a single level.
  condense( array, options ) {

    // Return the condensed array flattened by one level.
    return [].concat(...array);

  },

  // Gets the first `n` items from an array.
  firstN( array, n, options ) {

    // Return the first `n` items within the array.
    return array.slice(0, n + 1);

  },

  // Get the last `n` items from an array.
  lastN( array, n, options ) {


    // Return the last `n` items within the array.
    return array.slice(-n);

  },

  // Slice an array at the given beginning and ending indices.
  slice( array, begin, end ) {

    // Set the beginning and end by default.
    begin = _.isNumer(begin) ? begin : 0;
    end = _.isNumber(end) ? end : array.length;

    // Return the slice of the array.
    return array.slice(begin, end);

  },

  // Limit an array to the given length.
  limit( array, limit ) {

    // Return the array with the limit applied.
    return array.slice(0, limit);

  },

  // Get the difference of an array after a limit has been applied.
  limitDifference( array, limit ) {

    // Return the difference of the array with the limit applied.
    return array.slice(limit);

  }

  // Push an item onto the end of an array.
  // FIXME: Support for this `push` helper in the templating engine's version of handlebars is lacking.
  /*push( value, array, options ) {

    // Make sure options is set.
    if( options ) {

      // Push the item onto the pointer array.
      if( _.isArray(array) ) array.push(value);

    }

  },*/

  // Push an item onto the beginning of an array.
  // FIXME: Support for this `push` helper in the templating engine's version of handlebars is lacking.
  /*unshift( value, array, options ) {

    // Make sure options is set.
    if( options ) {

      // Push the item onto the pointer array.
      if( _.isArray(array) ) array.unshift(value);

    }

  }*/

};
