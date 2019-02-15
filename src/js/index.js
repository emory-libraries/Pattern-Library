// Load dependencies.
//
// NOTE: If not using a module bundler, like Browserify or Webpack, this will not work.
// Instead, you will need to manually load these dependencies in the browser using `<script>` tags.
const _ = require('lodash');
const Vue = require('vue');
const L = require('leaflet');
const $ = require('jQuery');

// Build utility methods.
const EUL = {
  
  // Load scripts using URLs.
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
    
  }
  
};

// Extend Leaflet.
require('leaflet-providers');

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

// Initialize an event bus for handling events.
const Events = new Vue();

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

    filters: {},

    created() {

      // Initialize data using any defaults given.
      if( this.defaults ) _.forIn(this.defaults, (value, key) => {

        this.$set(this, key, value);

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

// Export globals.
global._ = _;
global.Vue = Vue;
global.Events = Events;
global.Components = Components;
global.Leaflet = global.L = L;
global.jQuery = global.$ = $;
global.EUL = EUL;
