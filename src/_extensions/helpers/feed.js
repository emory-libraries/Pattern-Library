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

    // Parse and return JSON as is.
    if( type === 'json' ) return JSON.parse(body);

    // Extract and parse the feed data from the response.
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

  }

};
