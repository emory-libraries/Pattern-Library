// Initialize the Vue.
let App = [];

// Instantiate the Vue.
if( !PATTERNLAB ) Array.from($('.eul-vue')).forEach((el) => App.push(new Vue({el})));

// Export globals.
global._ = _;
global.Vue = Vue;
global.Events = Events;
global.Components = Components;
global.Store = Store;
global.Leaflet = global.L = L;
global.jQuery = global.$ = $;
global.EUL = EUL;
global.App = App;
