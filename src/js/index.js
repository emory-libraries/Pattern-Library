// Extend lodash.
_.capitalizeChar = ( str, i ) => {

  // Ignore non-strings.
  if( !_.isString(str) ) return '';

  // Get parts of the string.
  const pre = i === 0 ? '' : str.slice(0, i - 1);
  const chr = str.charAt(i).toUpperCase();
  const suf = i === str.length - 1 ? '' : str.slice(i + 1);

  return pre + chr + suf;

};
_.toggle = (options, current) => options[+!options.indexOf(current)];
_.cloneDeepOwn = ( thing ) => {

  // Get the clone.
  const clone = _.cloneDeep(thing);

  // Ensure that own properties are also cloned.
  _.forOwn(thing, (value, key) => {

    clone[key] = _.cloneDeep(value);

  });

  // Return the clone.
  return clone;

};
_.isCollection = ( value ) => {

  // Only consider arrays as possible collections.
  if( !_.isArray(value) ) return false;

  // In order for an array to be a collection, require that all of its items are objects.
  return _.every(value, _.isPlainObject);

};

// Always attempt to parse the query string.
window.location.params = _.reduce(_.trimStart(window.location.search, '?').split('&'), (result, param) => {

  // Get the parameter's key and value.
  const [key, value] = param.split('=').map(_.trim);

  // Save the query parameter.
  return _.set(result, key, value);

}, {});

// Attempt to get the website root address (base URL) for the site.
// NOTE: This is a workaround for development and production URL differences across environments.
// NOTE: If using a virtual host on your local machine during development that includes a path in the URL, you'll need to "whitelist" your configuration here.
// NOTE: If setting up a new deployment destination that includes a path in the URL, you'll need to "whitelist" your configuration here.
const ROOT = _.get({
  'template.library.emory.edu': 'https://template.library.emory.edu/styleguide/patternlibrary/current',
  'localhost': 'http://localhost/Pattern-Library/public'
}, window.location.host, '');

// Build utility methods.
const EUL = {

  // Load scripts from a given set of URLs.
  loadScripts( scripts ) {

    // Initialize script elements.
    const elements = [];

    // Load scripts by insterting them as elements into our HTML.
    scripts.forEach((script) => {

      // Create script element.
      elements.push($('<script>', _.isString(script) ? {src: script} : script));

    });

    // Load all scripts.
    $(document.body).append(...elements);

  },

  // Escape strings for use as a regex.
  escapeRegExp: ( string ) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),

  // Map all items in a JSON or RSS feed to match a given content model.
  mapFeed( feed, model, constants = {}, recursive = true ) {

    // Initialize a helper for mapping source data to a model.
    const map = ( feed, model, constants = {}, recursive = true ) => {

      // Initialize a set of utilities to help map data.
      const utils = {

        // Determine if a key in the model is conditional.
        isConditional: ( key ) => _.endsWith(key, '?'),

        // Bind a key-value pair in the model.
        bindModel( key, value, data, constants = {}, recursive = true ) {

          // Initialize a simplified version of the model.
          let model = {};

          // Update the simplified model to reflect the current key-value model.
          model[key] = value;

          // Determine if the key is conditional.
          if( utils.isConditional(key) ) {

            // Get the key name without the conditional flag.
            const base = _.trimEnd(key, '?');

            // Get the condition that needs to be met in order for the value to be included.
            const condition = bind(value.criteria, data, {condition: true, constants});

            // Get the criteria that must be met in order to display the conditional data.
            const criteria = new Function(`return ${condition};`);

            // Remove the conditional key from the model.
            delete model[key];

            // Rewrite the model to reflect the intended output.
            model[base] = value.value;

            // Evaluate the criteria, and only include the value if the criteria was met.
            if( criteria() ) data[base] = bind(value.value, data, {
              recursive,
              model,
              key: base,
              constants
            });

          }

          // Otherwise, bind the data as is.
          else data[key] = bind(value, data, {
            recursive,
            model,
            key,
            constants
         });

        }

      };

      // Map each item within the feed.
      feed = feed.map((data) => {

        // Loop through the data model, and map things as needed.
        _.each(model, (value, key) => {

          // Bind the data with the model.
          utils.bindModel(key, value, data, constants, recursive);

        });

        // Return the updated data.
        return data;

      });

      // Return the updated feed.
      return feed;

    };

    // Initialize a helper for binding source data within a value.
    const bind = ( value, item, options = {} ) => {

      // Set defaults for options.
      options = _.extend({
        recursive: true,
        condition: false,
        model: null,
        key: null,
        constants: {}
      }, options);

      // Initialize a set of utilities to help find and replace values.
      const utils = {

        // Initialize a set of output filters to help manipulate output formats.
        _filters: {

          // Convert a comma-separated list to an array.
          list: (value) => value.split(',').map(_.trim),

          // Convert the date to a moment and format it as a date string.
          date: (value) => moment(value).format('MMMM D, YYYY'),

          // Convert the date to a moment and format it as a day string.
          day: (value) => moment(value).format('dddd, MMMM D, YYYY'),

          // Convert a string to a mailto email link if not in the form of one already.
          mailto: (value) => _.isString(value) ? /^<a.+?\>.+?<\/a>$/i.test(value) ? value : `<a href="${value}">${value}</a>` : value

        },

        // Determine if a value has a placeholder that should be bound.
        hasPlaceholder: (value) => /{[\S-_.|='\[\] ]+?}/i.test(value),

        // Determine if a placeholder has filters that should be applied.
        hasFilters: (placeholder) => /(\| [\S-_]+)+$/i.test(placeholder),

        // Determine if a placeholder is for a constant.
        isConstant: (placeholder) => Object.keys(options.constants).includes(_.trimEnd(_.trimStart(placeholder, '{'), '}')),

        // Get the constant for a given placeholder.
        getConstant: (placeholder) => _.get(options.constants, _.trimEnd(_.trimStart(placeholder, '{'), '}')),

        // Get all placeholders in a value.
        getPlaceholders: (value) => value.match(/{[\S-_.|='\[\] ]+?}/ig),

        // Get all filters in a placeholder.
        getFilters(placeholder) {

          // Trim any curly brackets from the placeholder.
          placeholder = _.trimEnd(_.trimStart(placeholder, '{'), '}');

          // Locate the filter data within the placeholder.
          placeholder = placeholder.substring(placeholder.indexOf('|') + 1, value.length - 1);

          // Get the filters in an array.
          return placeholder.split('|').map(_.trim);

        },

        // Interpret the keys for a given placeholder.
        getKeys( placeholder ) {

          // Get the placeholder's base name.
          let base = _.trimEnd(_.trimStart(placeholder, '{'), '}');

          // Determine if the placeholder has a filter, and if so, remove it.
          if( utils.hasFilters(base) ) base = base.substring(0, base.indexOf('|') - 1).trim();

          // Get the individual keys in the placeholder.
          let keys = base.split('.').map(_.trim);

          // Define a regex for filter keys.
          const regex = /^([\S]+?)\[([\S]+?)='?([\S ]+?)'?\]$/i;

          // Interpret the keys.
          keys = keys.map((key, n) => ({
            filter: regex.test(key),
            match: key.match(regex),
            index: _.isInteger(key),
            first: n === 0,
            last: n === keys.length - 1,
            n,
            key
          }));

          // Save the placeholder as metadata.
          keys.placeholder = placeholder;

          // Return the keys.
          return keys;

        },

        // Replace the placeholder in the value with data using the respective keys.
        setPlaceholder( value, data, keys, conditional = false ) {

          // Initialize a pointer.
          let pointer = data;

          // Loop through the keys, and move the pointer accordingly.
          _.each(keys, (key) => {

            // If the pointer can't be moved, then skip the key.
            if( !_.isArray(pointer) && !_.isPlainObject(pointer) ) return;

            // Otherwise, move the pointer accordingly for filter keys.
            else if( key.filter ) {

              // Get the key that's being targeted.
              const target = _.get(data, key.match[1], []);

              // Move the pointer where the key-value pair matches the pointer.
              pointer = _.find(target, (item) => _.get(item, key.match[2]) == key.match[3]);

            }

            // Otherwise, simply move the pointer.
            else pointer = _.get(pointer, key.key);

          });

          // For placeholders within conditional statements, escape the pointer's value.
          if( conditional ) {

            // Convert objects and arrays to strings.
            if( _.isPlainObject(pointer) || _.isArray(pointer) ) pointer = JSON.stringify(pointer);

            // Otherwise, for strings, wrap them in quotes.
            else if( _.isString(pointer) ) pointer = pointer.indexOf("'") > -1 ? `"${pointer}"` : `'${pointer}'`;

            // Otherwise, for all other values, convert them to their string equivalents.
            else switch(pointer) {
              case null: pointer = 'null'; break;
              case undefined: pointer = 'undefined'; break;
              case true: pointer = 'true'; break;
              case false: pointer = 'false'; break;
            }

          }

          // Bind the pointer's value back into the string value.
          value = value.replace(keys.placeholder, pointer);

          // For literal pointer values, force the assigned values to also be literal.
          if( [undefined, null, NaN, true, false].includes(pointer) ) {

            // Override the value with the pointer's literal.
            if( `${pointer}` === value ) value = pointer;

          }

          // Return the updated value.
          return value;

        },

        // Apply output filters to a newly bound string value.
        applyFilters( value, filters ) {

          // Make sure the filters are in array form.
          if( !_.isArray(filters) ) filters = [filters];

          // Apply filters in order to the value.
          _.each(filters, (filter) => value = utils._filters[filter](value));

          // Return the value with filters applied.
          return value;

        },

        // Replace all placeholders within a given value using the given data.
        replacePlaceholders(value, data) {

          // Determine if the value has a placeholder, and only attempt to replace things if so.
          if( utils.hasPlaceholder(value) ) {

            // Get the placeholders within the value.
            const placeholders = utils.getPlaceholders(value);

            // Loop through each placeholder, and replace it with its target value.
            _.each(placeholders, (placeholder) => {

              // Determine if the placeholder is a constant, and if so, replace it with its constant value.
              if( utils.isConstant(placeholder) ) value = value.replace(placeholder, utils.getConstant(placeholder));

              // Otherwise, handle non-constant placeholders.
              else {

                // Get the placeholder's keys.
                const keys = utils.getKeys(placeholder);

                // Replace the placeholder with its respective data given the keys.
                value = utils.setPlaceholder(value, item, keys, options.condition);

                // Determine if the placeholder has filters, and if so, get and apply them.
                if( utils.hasFilters(placeholder) ) {

                  // Get the filters.
                  const filters = utils.getFilters(placeholder);

                  // Apply the filters to the value.
                  value = utils.applyFilters(value, filters);

                }

              }

            });

          }

          // Return the updated value.
          return value;

        }

      };

      // Handle simple arrays differently.
      if( _.isArray(value) || _.isPlainObject(value) ) {

        // Determine which map function to use.
        const mapFn = _.isArray(value) ? _.map : _.mapValues;

        // Always bind things within the array or object if recursion is enabled.
        if( options.recursive ) value = mapFn(value, (v) => bind(v, item, {recursive: true, constants}));

      }

      // Otherwise, handle scalar values.
      else value = utils.replacePlaceholders(value, item);

      // Return the updated value.
      return value;

    };

    // Return the feed's content after mapping its data to the model.
    return map(feed, model, constants, recursive);

  }

};

// Temporarily disabled Leaflet while `atoms-map` is not in use.
// Extend Leaflet.
// require('leaflet-providers');

// Initialize an event bus for handling events.
const Events = new Vue();

// Initialize a data store using session storage.
const Store = new Vue({

  data: {
    name: 'EUL',
    storage: sessionStorage,
    data: {}
  },

  methods: {

    get( key = null ) {

      return key ? _.get(this.data, key) : this.data;

    },

    set( key, value ) {

      _.set(this.data, key, value);

      this.save();

    },

    unset( key ) {

      _.unset(this.data, key);

      this.save();

    },

    save() {

      _.set(this.storage, this.name, JSON.stringify(this.data));

    },

    fetch() {

      const data = _.get(this.storage, this.name);

      return data ? JSON.parse(data) : null;

    },

    wipe() {

      delete this.storage[this.name];

    },

    reset() {

      this.data = {};

      this.save();

    },

    init() {

      const data = this.fetch();

      if( data ) this.data = data;

      else this.save();

    }

  },

  created() {

    // Initialize the data store.
    this.init();

  }

});

// Initalize a registry for creating and storing components.
const Components = {

  // Set our component namespace.
  _namespace: 'eul',

  // Convert our component namespace to a prefix.
  _prefix() {

    return this._namespace + '-';

  },

  // Get a namespaced component name.
  _name( shorthand ) {

    // Erase any namespace prefixes that exist.
    if( shorthand.indexOf(this._prefix()) === 0 ) shorthand = shorthand.substring(this._prefix().length);

    // Convert to standard component name.
    return _.kebabCase(this._prefix() + shorthand);

  },

  // Get a component registry ID.
  _id( shorthand ) {

    // Erase any namespace prefixes that exist.
    if( shorthand.indexOf(this._prefix()) === 0 ) shorthand = shorthand.substring(this._prefix().length);

    // Convert to a standard component registry ID.
    return _.capitalizeChar(_.camelCase(shorthand), 0);

  },

  // Capture component definitions.
  _definitions: {},

  // Capture registered components.
  _components: {},

  // Initializes utility methods.
  _utils: {

    // Extend a function by merging old and new functionality.
    extendFunc( oldFunc, newFunc ) {

      return function() {

        oldFunc.apply(this);
        newFunc.apply(this);

      };

    },

    // Extend component properties.
    extendProps( oldProps, newProps ) {

      // Handle properties when new properties are in the form of an array.
      if( _.isArray(newProps) && _.isObject(oldProps) ) {

        // Just add the old properties onto our new properties.
        _.forIn(oldProps, (conf, prop) => newProps[prop] = conf);

      }

      // Otherwise, simply merge the properties.
      return _.merge({}, oldProps, newProps);

    }

  },

  // Define a base definition for all components to build off of.
  _base: {

    props: {
      defaults: {
        type: Object,
        default() {
          return {};
        }
      }
    },

    methods: {},

    filters: {

      // Truncate a string to the given length, optionally adding a suffix where the omission occurs.
      truncate( string, length, omission = '…' ) {

        return _.truncate(string, {
          length,
          omission
        });

      },

      // Capitalize the first charater in a string.
      capitalize( string ) {

        return _.capitalize(string);

      },

      // Make a string uppercase.
      uppercase( string ) {

        return _.upperCase(string);

      },

      // Make a string lowercase.
      lowercase( string ) {

        return _.lowerCase(string);

      },

      // Encode a string with HTML entities.
      encode( string ) {

        // Encode the given string.
        return he.encode(string);

      },

      // Decode a string with HTML entities.
      decode( string ) {

        // Decode the given string.
        return he.decode(string);

      }

    },

    created() {

      // Initialize data using any defaults given.
      if( this.defaults ) _.forIn(this.defaults, (value, key) => {

        if( _.has(this, key) ) this.$set(this, key, value);

      });

    }

  },

  // Merge our base definition with other definitions.
  _merge( source, ...defs ) {

    // Use the base definition as our template.
    let result = _.merge({}, source);

    // Merge all other objects into the template.
    _.each(defs, (def) => {

      // Always extend functions to maintain their previous functionality.
      _.forIn(def, (value, key) => {

        // Extend functions.
        if( _.isFunction(value) && _.isFunction(result[key]) ) {

          // Rewrite the function.
          def[key] = this._utils.extendFunc(result[key], value);

        }

      });

      // Extend properties.
      if( def.props && result.props ) {

        def.props = this._utils.extendProps(result.props, def.props);

      }

      // Merge the object into the template.
      result = _.merge({}, result, def);

    });

    // Return the merged object.
    return result;

  },

  // Register a component.
  register( componentName, componentDef = {}, extend = false ) {

    // Save the definition.
    this._definitions[this._id(componentName)] = componentDef;

    // Register the component.
    this._components[this._id(componentName)] = Vue.component(this._name(componentName), extend ? componentDef : this._merge(this._base, componentDef));

    // Make methods chainable.
    return this;

  },

  // Unregister a component.
  unregister( componentName ) {

    // Remove the definition.
    if( this._definitions[this._id(componentName)] ) delete this._definitions[this._id(componentName)];

    // Unregister the component.
    if( this._components[this._id(componentName)] ) delete this._components[this._id(componentName)];

    // Wipe component from Vue's memory.
    if( Vue.options.components[this._name(componentName)] ) delete Vue.options.components[this._name(componentName)];

    // Make methods chainable.
    return this;

  },

  // Extend a previously registered component.
  extend( componentName, componentDef = {} ) {

    // Register the component if not previously registered.
    if( !this._components[this._id(componentName)] ) this.register(componentName, componentDef);

    // Otherwise, extend the previously registered component.
    else this.register(componentName, Vue.options.components[this._name(componentName)].extend(componentDef), true);

    // Make methods chainable.
    return this;

  }

};

// Initialize a fuzzy search utility.
class Fuzzy {

  // Constructor
  constructor( index, options = {} ) {

    // Capture self.
    const self = this;

    // Configure the search utility.
    this.config = _.merge({
      threshold: 0.6,
      similarity: 0.125,
      location: 0,
      distance: 300,
      insensitive: true,
      chars: 1,
      sort: true,
      scoring: true,
      attrs: {
        base: 'data-search',
        key: 'key',
        value: 'value',
        attr: 'attr',
        id: 'id'
      },
      tokenize: true,
      debug: true,
      order: 'desc',
      callbacks: {
        sort( sorted ) {

          // Reorder items based on sort order.
          _.each(sorted.map((item) => item.__el), (el) => {

            // Sort.
            if( $(el) ) $(el).parent().append(el);

          });

        },
        filter( filtered, filteredout ) {

          // Show filtered.
          _.each(filtered.map((item) => item.__el), (el) => {

            // Show.
            if( el ) $(el).show();

          });

          // Hide filteredout.
          _.each(filteredout.map((item) => item.__el), (el) => {

            // Hide.
            if( el ) $(el).hide();

          });

        },
        search( results, nonresults ) {

          // Show results.
          _.each(results.map((item) => item.__el), (el) => {

            // Show.
            if( el ) $(el).show();

          });

          // Hide nonresults.
          _.each(nonresults.map((item) => item.__el), (el) => {

            // Hide.
            if( el ) $(el).hide();

          });

        },
        page( active, inactive, data ) {

          // Show active.
          _.each(active.map((item) => item.__el), (el) => {

            // Show.
            if( el ) $(el).show();

          });

          // Hide inactive.
          _.each(inactive.map((item) => item.__el), (el) => {

            // Hide.
            if( el ) $(el).hide();

          });

        }
      }
    }, options);

    // Implement utility methods.
    this.utils = {

      // Get an attribute name.
      attr: ( id ) => `${self.config.attrs.base}-${self.config.attrs[id]}`,

      // Find references to associated index elements.
      reference( index ) {

        // Get the ID attribute.
        const attr = this.attr('id');

        // Use the index data as given, but associate it with elements on the page.
        if( _.isPlainObject(index[0]) ) {

          // Locate elements for each index item.
          return index.map((item) => {

            // Get the item ID.
            const id = item.id;

            // Attempt to find the element based on ID.
            const $el = $(`[${attr}="${id}"]`);

            // Save elements when found.
            if( $el.length > 0 ) item.__el = $el[0];

            // Return.
            return item;

          });

        }

        // Otherwise, assume a list of IDs was given and index items need to be located and parsed.
        else {

          // Locate elements by ID.
          return this.index(_.compact(index.map((id) => {

            // Attempt to find the element based on ID.
            const $el = $(`[${attr}="${id}"]`);

            // Save elements when found.
            if( $el.length > 0 ) return $el;

            // Otherwise, return nothing.
            return null;

          })));

        }

      },

      // Convert a list of elements to an index.
      index( list ) {

        // Initialize result.
        const result = [];

        // Initialize a helper method for parsing elements as index items.
        const parse = ( item ) => {

          // Find all elements that have some search data.
          const targets = $(item).add($(item).find('*')).filter((i, el) => {

            // Get the element's attributes.
            const attrs = _.toArray(el.attributes);

            // Only keep elements with usable attributes.
            return _.some(attrs, (attr) => attr.name.indexOf(this.attr('key')) === 0);

          });

          // Initialize the data for the item.
          const data = {};

          // Find items with search data.
          result.push(_.reduce(_.toArray(targets).map((target) => {

            // Get all of the target's attributes.
            const attrs = _.toArray(target.attributes);

            // Get only the target's relevant attribute data.
            const rattrs = _.toArray(target.attributes).filter((attr) => {

              // Only look for key attributes at the moment.
              return attr.name.indexOf(self.config.attrs.base) === 0;

            });

            // Get the data
            rattrs.filter((attr) => {

              // Only use key attributes at the moment.
              return attr.name.indexOf(this.attr('key')) === 0;

            }).reduce((result, attr, index, source) => {

              // Initialize key and value.
              let key, value;

              // Look for designated key-value pairs.
              if( attr.name.indexOf(':') > -1 ) {

                // Get the attribute key and value.
                key = attr.name.split(':')[1];
                value = attr.value;

                // Check to see if the key already exists in the data, and if so, form an array.
                if( _.has(result, key) ) {

                  // Get the old value for the key.
                  let old = _.get(result, key);

                  // Merge the new value with the old value.
                  _.set(result, key, _.isArray(old) ? _.concat(old, value) : [old, value]);

                }

                // Otherwise, capture the attribute key and value.
                else _.set(result, key, value);

              }

              // Otherwise, look for values elsewhere.
              else {

                // Look for an attribute or value.
                const a = _.get(rattrs.filter((attr) => {

                  // Find possible attribute values.
                  return attr.name == this.attr('attr');

                }), 0, false);
                const v = _.get(rattrs.filter((attr) => {

                  // Find possible attribute values.
                  return attr.name == this.attr('value');

                }), 0, false);

                // Get the attribute's key and value.
                key = attr.value;
                value = (a ? attrs[a.value] : v ? v.value : null) || target.value || target.textContent.trim();

                // Check to see if the key already exists in the data, and if so, form an array.
                if( _.has(result, key) ) {

                  // Get the old value for the key.
                  let old = _.get(result, key);

                  // Merge the new value with the old value.
                  _.set(result, key, _.isArray(old) ? _.concat(old, value) : [old, value]);

                }

                // Otherwise, save the data.
                else _.set(result, key, value);

              }

              // Return the parsed data.
              return result;

            }, data);

            // Return data and element.
            return _.merge({__el: $(item)[0]}, data);

          }), (result, data) => {

            return _.merge(result, data);

          }, {}));

        };

        // If an array of items was given, then assume the array contains the items to be parsed.
        if( _.isArray(list) ) {

          // Index each item.
          list.forEach((item) => parse(item));

        }

        // Otherwise, try to parse the items in a list.
        else {

          // Extract the items from the list, and index them.
          $(list).children().each((i, item) => parse(item));

        }

        // Return.
        return result;

      },

      // Tokenize a query string.
      tokenize( query ) {

        // Convert the query into its various tokenized forms.
        let tokens = [];

        // Get base tokens.
        const words = query.split(' ');

        // Fully tokenize the query when enabled.
        if( self.config.tokenize ) {

          // Capture all token combinations.
          for( let n = words.length; n > 0; n-- ) {

            // Initialize the combinations.
            const combos = [];

            // Get word combinations.
            words.forEach((word, i) => {

              // Initialize the word combination.
              const combo = [word];

              // Capture any additional words in the combination
              for( let x = 1; x < n; x++ ) { if( words[i + x] ) combo.push(words[i + x]); }

              // Save the captured words.
              if( combo.length === n ) combos.push(combo.join(' '));

            });

            // Save the combinations.
            if( combos.length > 0 ) {

              // Add a weight.
              combos.weight = n;

              // Save it.
              tokens.push(combos);

            }

          }

        }

        // Otherwise, just replicate a tokenized structure.
        else {

          // Use the query as is.
          tokens = [[query]];

          // Add a weight.
          tokens[0].weight = words.length;

        }

        // Return tokens.
        return tokens;

      },

      // Calculate a score for a single token and value.
      calc( token, value ) {

        // Initialize the result.
        let location, distance, score, similarity = null, threshold = null, index = {};

        // Handle arrays of values.
        if( _.isArray(value) ) {

          // Calculate a score for each array item.
          const scores = value.map((value) => this.calc(token, value));

          // Get the average location, distance, and score of the token.
          location = _.sum(_.map(scores, 'location')) / scores.length;
          distance = _.sum(_.map(scores, 'distance')) / scores.length;
          score = _.sum(_.map(scores, 'score')) / scores.length;

        }

        // Otherwise, handle primitive values.
        else {

          // Make insensitive if applicable.
          if( self.config.insensitive ) {

            token = token.toLowerCase();
            value = value.toLowerCase();

          }

          // Determine the index of the token.
          index = {
            word: !(new RegExp(`[a-z0-9_'-]+${token}|${token}[a-z0-9_'-]+`, 'i')).test(value) && value.indexOf(token) > -1,
            match: value.indexOf(token),
            start: 0,
            end: value.length - 1
          };

          // Get token location, distance, and similarity.
          location = index.match;
          distance = location - self.config.location;
          similarity = compareTwoStrings(token, value);

          // Calculate threshold.
          threshold = location < 0 ? -1 : location / (self.config.threshold * self.config.distance);

          // Determine if the threshold and similarity meet configuration criteria.
          const criteria = {
            threshold: threshold >= 0 && threshold <= self.config.threshold,
            similarity: similarity >= self.config.similarity
          };

          // Initialize score.
          score = 0;

          // Calculate score.
          if( criteria.similarity && criteria.threshold ) score = similarity + index.word;
          if( criteria.similarity && !criteria.threshold ) score = similarity;
          if( !criteria.similarity && criteria.threshold ) score = (1 - threshold) + index.word;

        }

        // Return result.
        return {
          index,
          threshold,
          location,
          distance,
          similarity,
          score
        };

       },

      // Calculate the score of some index value against a query.
      score( query, value ) {

        // Initialize the score.
        let score = 0;

        // Get tokens.
        let tokens = this.tokenize(query);

        // Calculate token scores.
        tokens = tokens.map((tokens) => {

          // Get the score for each token.
          const scores = tokens.map((token) => this.calc(token, value));

          // Get average scores.
          scores.average = _.sum(_.map(scores, 'score')) / scores.length;

          // Get weighted scores.
          scores.weighted = scores.average * tokens.weight;

          // Return scores.
          return scores;

        });

        // Return the weighted score.
        return _.sum(_.map(tokens, 'weighted')) / tokens.length;

      },

      // Convert keys for sorting into an array of keys.
      keys( keys ) {

        // Use keys given as an array.
        if( _.isArray(keys) ) return keys;

        // Extract keys from objects.
        if( _.isPlainObject(keys) ) return Object.keys(keys);

        // Otherwise, wrap primitive keys in an array.
        return [keys];

      },

      // Extract sort orders for sorting.
      orders( keys, orders = null ) {

        // Make sure sort orders are the same length as keys.
        if( _.isArray(keys) && _.isArray(orders) ) return keys.map((key, i) => orders[i]);

        // Use default sort order for all keys.
        if( _.isArray(keys) && _.isNil(orders) ) return keys.map(() => self.config.order);

        // Extract sort orders from object keys.
        if( _.isPlainObject(keys) ) return Object.keys(keys);

        // Use the given sort order.
        if( !_.isNil(orders) ) return [orders];

        // Otherwise, use default sort order.
        return [self.config.order];

      },

      // Sort data on a key.
      sort( data, keys, orders = null ) {

        // Get keys and sort orders.
        keys = this.keys( keys );
        orders = this.orders( keys, orders );

        // Sort the data.
        return _.orderBy(data, keys, orders);

      },

      // Impose a limit on the number of items in the data set.
      limit( data, limit ) {

        return _.chunk(data, limit);

      },

      // Get data on a given page from a paginated data set.
      onPage( pages, page = 1 ) {

        return pages[page - 1];

      },

      // Get data not on a given page from a paginated data set.
      offPage( pages, page = 1 ) {

        return _.concat([], ..._.slice(pages, page));

      },

      // Gets the next page in a paginated data set.
      nextPage( pages, current ) {

        return current == pages.length ? false : current + 1;

      },

      // Gets the previous page in a paginated data set.
      previousPage( pages, current ) {

        return current === 0 ? false : current - 1;

      },

      // Paginate a set of data.
      paginate( data, limit, page = 1 ) {

        // Impose the limit on the data set.
        const pages = this.limit(data, limit);

        // Return data.
        return {
          limit,
          unpaginated: data,
          pages,
          current: page,
          next: this.nextPage(page),
          previous: this.previousPage(page),
          count: pages.length,
          onPage: this.onPage(pages, page),
          offPage: this.offPage(pages, page)
        };

      },

      // Unpaginate a set of data.
      unpaginate( data ) {

        // Return data.
        return {
          limit: null,
          unpaginated: null,
          pages: null,
          current: null,
          next: null,
          previous: null,
          count: null,
          onPage: data,
          offPage: []
        };

      }

    };

    // Initialize method-specific data.
    this.sorting = {
      sorted: false,
      keys: [],
      orders: [],
      unsorted: null
    };
    this.filtering = {
      filtered: false,
      unfiltered: null
    };
    this.searching = {
      searched: false,
      unsearched: null
    };
    this.paging = {
      paginated: false,
      unpaginated: null,
      pages: null,
      limit: null,
      current: null,
      next: null,
      previous: null,
      count: null,
      update( data ) {

        // Set paging data.
        this.unpaged = this.unpaged || data.unpaged;
        this.pages = data.pages;
        this.limit = data.limit;
        this.current = data.current;
        this.next = data.next;
        this.previous = data.previous;
        this.count = data.count;

      }
    };

    // Initialize event listeners.
    this.listeners = {
      // Fired when searching is first initiated.
      searching: [],
      // Fired after a search is completed.
      searched: [],
      // Fired when a search is cleared.
      unsearched: [],
      // Fired when filtering is first initiatied.
      filtering: [],
      // Fired when a filter is applied.
      filtered: [],
      // Fired when all filters are removed.
      unfiltered: [],
      // Fired when sorting is first initiated.
      sorting: [],
      // Fired when a sort is applied.
      sorted: [],
      // Fired when all sorted is removed.
      unsorted: [],
      // Fired when paging is first initiated.
      paging: [],
      // Fired when a new page is becomes active.
      paged: [],
      // Fired when paging is removed.
      unpaged: []
    };

    // Initialize index.
    this.index = _.isArray(index) ? this.utils.reference(index) : this.utils.index(index);

    // Initialize data.
    this.reset();

  }

  // Reset the data back to the index.
  reset() {

    // Reset the data.
    this.data = _.cloneDeep(this.index);

    // Make the method chainable.
    return this;

  }

  // Add an event listener.
  on( events, callback ) {

    // Ignore invalid callbacks.
    if( _.isFunction(callback) ) {

      // Register the callback for each event.
      events.split(' ').forEach((event) => this.listeners[event].push(callback));

    }

    // Make the method chainable.
    return this;

  }

  // Remove an event listener.
  off( events, callback ) {

    // Ignore invalid callbacks.
    if( _.isFunction(callback) ) {

      // Unregister the callback for each event.
      events.split(' ').forEach((event) => _.remove(this.listeners[event], (_callback) => callback == _callback));

    }

    // Make the method chainable.
    return this;

  }

  // Trigger some event(s).
  trigger( events, ...data ) {

    // Get all callbacks.
    const callbacks = _.reduce(this.listeners, (result, callbacks, event) => {

      // Capture event callbacks.
      if( events.split(' ').includes(event) ) result = result.concat(callbacks);

      // Continue.
      return result;

    }, []);

    // Fire all callbacks.
    callbacks.forEach((callback) => callback(...data));

    // Make the method chainable.
    return this;

  }

  // Sort the data.
  sort( keys, orders = null ) {

    // Get keys and orders.
    keys = this.utils.keys(keys);
    orders = this.utils.orders(keys, orders);

     // Temporarily unpaginate data if paginated.
    if( this.paging.paginated ) this.data = this.paging.unpaginated;

    // Set sorting data.
    this.sorting.sorted = true;
    this.sorting.unsorted = this.sorting.unsorted || _.cloneDeepOwn(this.data);
    this.sorting.keys = keys;
    this.sorting.orders = orders;

    // Trigger the sort event.
    this.trigger('sorting', _.zipObject(keys, orders));

    // Sort the data.
    let sorted = this.utils.sort(this.data, keys, orders);

    // Reapply pagination if it was temporarily removed.
    if( this.paging.paginated ) {

      // Get pagination data.
      const pagination = this.utils.paginate(sorted, this.paging.limit);

      // Update pagination data.
      this.paging.update(pagination);

      // Updates sorted  with pagination data.
      sorted = pagination.onPage;

    }

    // Save the data.
    this.data = sorted;

    // Trigger the sorted event.
    this.trigger('sorted', sorted, _.zipObject(keys, orders));

    // Call the sort callback.
    if( this.config.callbacks.sort ) this.config.callbacks.sort.call(this, sorted);

    // Make the method chainable.
    return this;

  }

  // Unsort the data.
  unsort( ) {

    // Unsort the data.
    this.data = this.sorting.unsorted || this.data;

    // Reset sorting data.
    this.sorting.sorted = false;
    this.sorting.unsorted = null;
    this.sorting.keys = [];
    this.sorting.orders = [];

    // Reapply pagination if it was previously applied.
    if( this.paging.paginated ) {

      // Get pagination data.
      const pagination = this.utils.paginate(this.data, this.paging.limit);

      // Update pagination data.
      this.paging.update(pagination);

      // Updates data according to pagination data.
      this.data = pagination.onPage;

    }

    // Trigger the unsorted event.
    this.trigger('unsorted', this.data);

    // Call the sort callback.
    if( this.config.callbacks.sort ) this.config.callbacks.sort.call(this, this.data);

    // Make this method chainable.
    return this;

  }

  // Filter the data.
  filter( ...filters ) {

    // Temporarily unpaginate data if paginated.
    if( this.paging.paginated ) this.data = this.paging.unpaginated;

    // Extract only valid filters.
    filters = _.filter(filters, (filter) => _.isFunction(filter));

    // Trigger filter event.
    this.trigger('filter', {filters});

    // Set filtering data..
    this.filtering.filtered = true;
    this.filtering.unfiltered = this.filtering.unfiltered || _.cloneDeepOwn(this.data);

    // Apply filters to the data.
    let filtered = _.filter(this.data, (item) => {

      // Return all items that passes all filters.
      return _.every(filters.map((filter) => filter(item)), (result) => result === true);

    });
    let filteredout = _.filter(this.data, (item) => {

      // Return all items that failed one or more filters.
      return _.every(filters.map((filter) => filter(item)), (result) => result !== true);

    });

    // Reapply pagination if it was temporarily removed.
    if( this.paging.paginated ) {

      // Get pagination data.
      const pagination = this.utils.paginate(filtered, this.paging.limit);

      // Update pagination data.
      this.paging.update(pagination);

      // Updates filtered and filtered out with pagination data.
      filtered = pagination.onPage;
      filteredout = filteredout.concat(pagination.offPage);

    }

    // Save filtered data.
    this.data = filtered;

    // Trigger filtered event.
    this.trigger('filtered', filtered, filteredout, {filters});

    // Call the filter callback.
    if( this.config.callbacks.filter ) this.config.callbacks.filter.call(this, filtered, filteredout);

    // Make the method chainable.
    return this;

  }

  // Unfilter the data.
  unfilter( ) {

    // Unfilter the data.
    this.data = this.filtering.unfiltered || this.data;

    // Reset filter data.
    this.filtering.filtered = false;
    this.filtering.unfiltered = null;

    // Reapply pagination if it was previously applied.
    if( this.paging.paginated ) {

      // Get pagination data.
      const pagination = this.utils.paginate(this.data, this.paging.limit);

      // Update pagination data.
      this.paging.update(pagination);

      // Updates data according to pagination data.
      this.data = pagination.onPage;

    }

    // Trigger the unfiltered event.
    this.trigger('unfiltered', this.data);

    // Call the filter callback.
    if( this.config.callbacks.filter ) this.config.callbacks.filter.call(this, this.data, []);

    // Make the method chainable.
    return this;

  }

  // Search data for a given query, optionally limiting the keys that are searched.
  search( query, keys = [] ) {

    // Temporarily unpaginate data if paginated.
    if( this.paging.paginated ) this.data = this.paging.unpaginated;

    // Trigger searching event.
    this.trigger('searching', {query, keys});

    // Ignore searches that don't match the minimum character length.
    if( query.length < this.config.chars ) return this.unsearch();

    // Set searching data.
    this.searching.searched = true;
    this.searching.unsearched = this.searching.unsearched || _.cloneDeepOwn(this.data);

    // Score all index items across given keys or all keys if none are given.
    const scored = this.index.map((item) => {

      // Get a subset of searchable fields.
      const searchable = _.reduce(item, (result, value, key) => {

        // Capture searchable fields.
        if( key.indexOf('__') !== 0 ) {

          // Limit by keys.
          if( !_.isEmpty(keys) ) {

            // Make sure the key exists.
            const _keys = _.reduce(keys, (_keys, _key) => {

              // Determine if keys given in dot notation exist.
              if( (_key.indexOf('.') > -1 || _key.indexOf('[') > -1) && _.isObject(value) ) {

                // Check to see if the current key matches and the rest of the keys can be found.
                _keys[_key] = _key.split('.')[0] && _.get(value, _key.split('.').slice(1));

              }

              // Otherwise, check to see if the keys match.
              _keys[_key] = _key == key;

              // Continue.
              return _keys;

            }, {});

            // Find any searchable field.
            if( Object.values(_keys).includes(true) ) result[key] = value;

          }

          // Otherwise, use all keys available.
          else result[key] = value;

        }

        // Reduce.
        return result;

      }, {});

      // Get weighted scores for all fields.
      item.__results = _.reduce(searchable, (result, value, key) => {

        // Get the field's score.
        result[key] = this.utils.score(query, value);

        // Reduce.
        return result;

      }, {});

      // Get weighted average of all scores.
      item.__score = _.sum(Object.values(item.__results)) / Object.values(item.__results).length;

      // Return scores.
      return item;

    });

    // Get nonresults (score = 0) and results (score > 0).
    let nonresults = _.filter(scored, {__score: 0});
    let results = _.filter(scored, (result) => result.__score > 0);

    // Sort the results in descending order based on score.
    if( this.config.sort ) results = this.utils.sort(results, {'__score': 'desc'});

    // Remove scoring if not enabled and not in debug mode.
    if( !this.config.scoring && !this.config.debug ) {

      // Delete scoring data from results.
      delete results.__score;
      delete results.__results;

      // Delete scoring data from nonresults.
      delete nonresults.__score;
      delete nonresults.__results;

    }

    // Reapply pagination if it was temporarily removed.
    if( this.paging.paginated ) {

      // Get pagination data.
      const pagination = this.utils.paginate(results, this.paging.limit);

      // Update pagination data.
      this.paging.update(pagination);

      // Updates results and nonresults with pagination data.
      results = pagination.onPage;
      nonresults = nonresults.concat(pagination.offPage);

    }

    // Trigger searched event.
    this.trigger('searched', results, nonresults, {query, keys});

    // Call the sort callback.
    if( this.config.sort && this.config.callbacks.sort ) this.config.callbacks.sort.call(this, results);

    // Call the search callback.
    if( this.config.callbacks.search ) this.config.callbacks.search.call(this, results, nonresults);

    // Save results data.
    this.data = results;

    // Make the method chainable.
    return this;

  }

  // Unsearch the data.
  unsearch( ) {

    // Unsearch the data.
    this.data = this.searching.unsearched || this.data;

    // Reset searching data.
    this.searching.searched = false;
    this.searching.unsearched = null;

    // Delete any score data.
    delete this.data.__score;
    delete this.data.__results;

    // Reapply pagination if it was previously applied.
    if( this.paging.paginated ) {

      // Get pagination data.
      const pagination = this.utils.paginate(this.data, this.paging.limit);

      // Update pagination data.
      this.paging.update(pagination);

      // Updates data according to pagination data.
      this.data = pagination.onPage;

    }

    // Trigger the unsearched event.
    this.trigger('unsearched', this.data);

    // Call the search callback.
    if( this.config.callbacks.search ) this.config.callbacks.search.call(this, this.data, []);

    // Make the method chainable.
    return this;

  }

  // Paginates the data set.
  paginate( limit ) {

    // Trigger paging event.
    this.trigger('paging', {limit});

    // Remove any paging if it already exists.
    if( this.paging.paginated ) this.data = this.paging.unpaginated;

    // Get pagination data.
    const pagination = this.utils.paginate(this.data, limit);

    // Set paging data.
    this.paging.paginated = true;
    this.paging.update(pagination);

    // Get on page and off page data.
    const {onPage, offPage} = pagination;

    // Save the on page data.
    this.data = onPage;

    // Trigger paged event.
    this.trigger('paged', onPage, offPage, pagination);

    // Call the paginated callback.
    if( this.config.callbacks.paginated ) this.config.callbacks.paginated.call(this, onPage, offPage, pagination);

    // Make the method chainable.
    return this;

  }

  // Unpaginate the data.
  unpaginate() {

    // Unpaginate the data.
    this.data = this.paging.unpaginated || this.data;

    // Get unpagination data.
    const unpagination = this.utils.unpaginate(this.data);

    // Reset paging data.
    this.paging.paginated = false;
    this.paging.unpaginated = null;
    this.paging.update(unpagination);

    // Get on page and off page data.
    const {onPage, offPage} = unpagination;

    // Trigger unpaged event.
    this.trigger('unpaged', onPage, offPage, unpagination);

    // Call the page callback.
    if( this.config.callbacks.page ) this.config.callbacks.page.call(this, onPage, offPage, unpagination);

    // Make the method chainable.
    return this;

  }

  // Jumps to a page in a paginated data set.
  page( page ) {

    // Do nothing if pagination was not previously applied.
    if( !this.paging.paginated ) return this;

    // Enable page keywords.
    switch( page ) {
      case 'next': page = this.utils.nextPage(this.paging.current); break;
      case 'previous': page = this.utils.previousPage(this.paging.current); break;
      case 'last': page = this.paging.count; break;
      case 'first': page = 1; break;
    }

    // Get pagination data.
    const pagination = this.utils.paginate(this.data, this.paging.limit, page);

    // Update paging data.
    this.paging.update(pagination);

    // Get on page and off page data.
    const {onPage, offPage} = pagination;

    // Save the on page data.
    this.data = onPage;

    // Trigger paged event.
    this.trigger('paged', onPage, offPage, pagination);

    // Call the page callback.
    if( this.config.callbacks.page ) this.config.callbacks.page.call(this, onPage, offPage, pagination);

    // Make the method chainable.
    return this;

  }

  // Populate a list element with the index items.
  populate( list, options = {
    template: '<li>:data</li>',
    props: {},
    css: {}
  } ) {

    // Find template parameters.
    const params = options.template.match(/:[a-z0-9\.\[\]]+/ig);

    // Create the list of elements.
    $(list).append(this.data.map((item, i) => {

      // Get the template.
      let template = options.template;

      // Bind template parameters.
      params.forEach((param) => template = template.replace(param, _.get(item, param.substring(1))));

      // Create the element.
      const $el = this.index[i].__el = item.__el = $(template, options.props);

      // Add CSS to the element.
      if( !_.isEmpty(options.css) ) $el.css(options.css);

      // Return the element.
      return $el;

    }));

    // Make the method chainable.
    return this;

  }

}

// Extend Vue with global variables.
Vue.prototype.global = window;
