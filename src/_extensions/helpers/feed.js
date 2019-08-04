// Load dependencies.
const parser = require('fast-xml-parser');
const request = require('sync-request');
const path = require('path');
const he = require('he');
const _ = require('lodash');

// Load configurations.
const config = require(path.resolve('patternlab-config.json'));

// Get the current environment.
const ENV = process.env.NODE_ENV;

// Get the current evnrionment's protocol.
const PROTOCOL = ENV == 'development' ? 'http' : 'https';

// Set base URL for each environment.
const BASE_URL = {
  development:  path.join('/', path.basename(process.cwd()), config.paths.public.root),
  production:   config.paths.live.pathname
};

// Set domain.
const DOMAIN = _.trimEnd(PROTOCOL + BASE_URL[ENV], '/');

// Initialize parser options.
const options = {
  attributeNamePrefix : '',
  attrNodeName: "@attributes",
  textNodeName : "value",
  ignoreAttributes : false,
  ignoreNameSpace : false,
  allowBooleanAttributes : true,
  parseNodeValue : true,
  parseAttributeValue : true,
  trimValues: true,
  //cdataTagName: "__cdata", //default is 'false'
  //cdataPositionChar: "\\c",
  //localeRange: "", //To support non english character in tag/attribute values.
  parseTrueNumberOnly: true,
  attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
  tagValueProcessor : a => he.decode(a) //default is a=>a
};

// Define content mime types.
const types = {
  'application/json': 'json',
  'application/xml': 'rss',
  'application/rss+xml': 'rss',
  'application/rdf+xml': 'rdf',
  'application/atom+xml': 'atom',
  'text/xml': 'rss',
  'text/html': 'rss',
  'text/plain': 'rss'
};

// Export helpers.
module.exports = {

  // Fetch a feed from the given URL and return the feed's parsed content.
  fetchFeed( url ) {

    const response = request('GET', `${PROTOCOL}://cors-anywhere.herokuapp.com/${url}`, {
      headers: {
        'Accept': _.keys(types).join(', '),
        'X-Requested-With': DOMAIN
      }
    });

    // Use the request headers to determine the content type.
    const type = types[response.headers['content-type'].split(';').map(_.trim)[0]];

    // Get the response body.
    const body = response.getBody('utf8');

    if (type == 'json') {
      const parsedBody = JSON.parse(body);
      parsedBody.__meta__ = {};
      parsedBody.__meta__.type = type;

      // Parse and return JSON as is.
      return parsedBody
    }

    // Extract and parse the feed data from the response.\
    let feed = parser.parse(body, options);

    // Remove the root node if found.
    if( _.isPlainObject(feed) && _.keys(feed).length === 1 ) {
      // Get the feed's root node.
      const root = _.keys(feed)[0];

      // Remove the root node for valid feeds.
      if( ['rss', 'rdf'].includes(root) ) feed = feed[root];

    }

    // Initialize a helper for recursively removing xmlns references.
    const removeXmlns = function( data ) {

      // Initialize the result.
      let result = _.isArray(data) ? [] : {};

      // Recurse over each key-value pair within the data.
      _.each(data, (value, key) => {

        // Handle attributes separately.
        if( key === '@attributes' ) {

          // Only keep attribute keys that don't correlate to an xmlns.
          _.each(value, (content, attribute) => {

            // Unset xmlns keys.
            if( attribute.indexOf('xmlns') === -1 ) _.set(result, `@attributes.${attribute}`, content);

          });

          // If none of the attributes were saved, then search for a value.
          if( _.isUndefined(_.get(result, '@attributes', undefined)) && !_.isUndefined(_.get(data, 'value', undefined)) ) {

            // Overwrite the result with the value.
            result = _.get(data, 'value');

            // Then, exit to loop.
            return;

          }

        }

        // Otherwise, continue recursing over objects and arrays.
        else if( _.isPlainObject(value) || _.isArray(value) ) _.set(result, key, removeXmlns(value));

        // Otherwise, save the key-value pair as is.
        else _.set(result, key, value);

      });

      // Return the result.
      return result;

    };

    // Remove all xmlns references.
    feed = removeXmlns(feed);

    // Return the parsed feed data.
    return feed;

  },

  // Map all items within a feed to a given data model.
  mapFeed( model, feed, options ) {

    // Capture the context.
    const context = this;

    // Initialize a helper for binding source data within a value.
    const bind = ( value, item, recursive = true ) => {

      // Handle array and object values differently.
      if( _.isArray(value) || _.isPlainObject(value) ) {

        // Determine which map function to use.
        const map = _.isArray(value) ? _.map : _.mapValues;

        // Only bind things within the array or object if recursion is enabled.
        if( recursive ) value = map(value, (v) => bind(v, item, recursive));

      }

      // Otherwise, handle simple values.
      else {

        // Initialize placeholders.
        let placeholders;

        // Search for placeholders that should be replaced with data from the given context.
        if( (placeholders = value.match(/\{\:[\S]+?\:\}/g)) ) {

          // Bind the placeholder data into the value.
          placeholders.forEach((placeholder) => {

            // Capture the placeholder's key.
            const key = placeholder.replace(/^\{\:|\:\}$/g, '');

            // Bind data from the given context into the value.
            value = value.replace(placeholder, _.get(context, key, ''));

          });

        }

        // Search for placeholders that should be replaced with data from the feed item.
        if( (placeholders = value.match(/\{[\S]+?\}/g)) ) {

          // Bind the placeholder data into the value.
          placeholders.forEach((placeholder) => {

            // Capture the placeholder's key.
            const key = placeholder.replace(/^\{|\}$/g, '');

            // Bind data from the given item's context into the value.
            value = value.replace(placeholder, _.get(item, key, ''));

          });

        }

      }

      // Return the bound value.
      return value;

    };

    // Map each item within the feed.
    feed = feed.map((data) => {

      // Loop through the data model, and map things as needed.
      _.each(model, (value, key) => {

        // Determine if the key is conditional.
        if( _.endsWith(key, '?') ) {

          // Get the key name without the conditional flag.
          key = _.trimEnd(key, '?');

          // Get the conditional that needs to be met in order for the value to be included.
          const condition = bind(value.criteria, data);

          // Get the criteria that must be met in order to display the conditional data.
          const criteria = new Function(`return ${condition};`);

          // Evaluate the criteria, and only include the value if the criteria was met.
          if( criteria() ) data[key] = bind(value.value, data);

        }

        // Otherwise, bind the data as is.
        else data[key] = bind(value, data);

      });

      // Return the updated data.
      return data;

    });

    // Return the feed.
    return feed;

  }

};
