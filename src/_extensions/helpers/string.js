// Load dependencies.
const _ = require('lodash');
const regexEscape = require('escape-string-regexp');

// Export helpers.
module.exports = {

  combine( ...strs ) { return strs.slice(0, -1).join('') },

  trimSubstringStart( str, substr, mods ) {

    // Set mods if not set.
    if( !_.isString(mods) ) mods = 'm';

    // Trim.
    return str.replace(new RegExp('^' + regexEscape(substr), mods), '');

  },

  trimSubstringEnd( str, substr, mods ) {

    // Set mods if not set.
    if( !_.isString(mods) ) mods = 'm';

    // Trim.
    return str.replace(new RegExp(regexEscape(substr) + '$', mods), '');

  },

  trimSubstring( str, substr ) { return this.trimSubstringEnd(this.trimSubstringStart(str, substr), substr); },

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

  }

};
