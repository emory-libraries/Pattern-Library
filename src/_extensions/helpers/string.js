// Load dependencies.
const _ = require('lodash');
const he = require('he');
const regexEscape = require('escape-string-regexp');

// Export helpers.
module.exports = {

  // Combine two or more strings.
  combine( ...strs ) { return _.initial(strs).join('') },

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
    return this.trimSubstringEnd(this.trimSubstringStart(str, substr), substr);

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
  decodeHTML( str ) { return he.decode(str); }

};
