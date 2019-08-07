// Load dependencies.
const _ = require('lodash');

// Export helpers.
module.exports = {

  // Repeat a block `x` number of times.
  repeat( x, options ) {

    // Initialize the result.
    let result = '';

    // Repeat the block `x` number of times.
    for( let i = 0; i < x; i++ ) {

      // Reveal data variables within the block.
      options.data.index = i;
      options.data.first = i === 0;
      options.data.last = i === x - 1;

      // Render the block, and capture its contents.
      result += options.fn(this);

    }

    // Return the result.
    return result;

  }

};
