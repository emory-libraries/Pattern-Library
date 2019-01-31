// Load dependencies.
//
// NOTE: If not using a module bundler, like Browserify or Webpack, this will not work.
// Instead, you will need to manually load these dependencies in the browser using `<script>` tags.
const _ = require('lodash');
const Vue = require('vue');

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

  // Register a component.
  register( componentName, componentDef = {} ) {

    // Save the definition.
    this._definitions[this._id(componentName)] = componentDef;

    // Register the component.
    this._components[this._id(componentName)] = Vue.component(this._name(componentName), componentDef);

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
    else this.register(componentName, Vue.options.components[this._name(componentName)].extend(componentDef));

    // Make methods chainable.
    return this;

  }

};

// Export globals.
global._ = _;
global.Vue = Vue;
global.Events = Events;
global.Components = Components;
