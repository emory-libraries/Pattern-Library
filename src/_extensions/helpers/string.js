// Load dependencies.
const _ = require('lodash');
const he = require('he');
const regexEscape = require('escape-string-regexp');
const uniqid = require('uniqid');

// Initialize helpers.
const helpers = {

  // Combine two or more strings.
  combine( ...strs ) { return _.initial(strs).join(''); },

  // Trim a substring from the start of another string.
  trimSubstringStart( str, substr, mods ) {

    // Set mods if not set.
    if( !_.isString(mods) ) mods = 'm';

    // Trim.
    return str.replace(new RegExp('^' + regexEscape(substr), mods), '');

  },

  // Trim a substring from the end of another string.
  trimSubstringEnd( str, substr, mods ) {

    // Set mods if not set.
    if( !_.isString(mods) ) mods = 'm';

    // Trim.
    return str.replace(new RegExp(regexEscape(substr) + '$', mods), '');

  },

  // Trim a substring from another string.
  trimSubstring( str, substr ) {

    // Trim the start and end of the string.
    return helpers.trimSubstringEnd(helpers.trimSubstringStart(str, substr), substr);

  },

  // Override the broken `truncateWords` helper in `handlebars-helpers`.
  truncateWords( str, count, suffix ) {

    if (_.isString(str) && _.isNumber(count)) {

      if (typeof suffix !== 'string') {
        suffix = '…';
      }

      var num = Number(count);

      var arr = str.split(/[ \t]/); console.log(num, arr.length);

      if (num < arr.length) {
        arr = arr.slice(0, num);
      }

      var val = arr.join(' ').trim();

      return val + suffix;

    }

  },

  // Encode a string to use HTML character codes as needed.
  encodeHTML( str ) { return he.encode(str, {useNamedReferences: true}); },

  // Decode a string using HTML character codes.
  decodeHTML( str ) { return he.decode(str); },

  // Generate a unique ID.
  uid( prefix ) {

    // Use an empty prefix if none was given.
    prefix = _.isString(prefix) ? prefix : '';

    // Return a unique ID with the prefix prepended.
    return uniqid(prefix);

  },

  // Determine if a string starts with another string.
  startsWithSubstring( str, substr, options ) {

    // Determine if the string starts with the substring.
    return str.substring(0, substr.length) === substr;

  },

  // Determine if a string ends with another substring.
  endsWithSubstring( str, substr, options ) {

    // Determine if the string ends with the substring.
    return str.substring(str.length - substr.length) === substr;

  },

  // Pad a string to the given length using the given characters.
  pad( string, length, chars ) {

    // Capture options.
    options = _.last([...arguments]);

    // Set a default character if none was given.
    chars = !_.isString(chars) ? ' ' : chars;

    // Get the default padding position.
    const position = _.get(options.hash, 'position', 'start');

    // Get the appropriate padding method based on the padding position.
    const pad = {
      start: _.padStart,
      end: _.padEnd,
      both: _.pad
    }[position];

    // Pad the string.
    return pad(string, length, chars);

  }

};

// Export helpers.
module.exports = helpers;
