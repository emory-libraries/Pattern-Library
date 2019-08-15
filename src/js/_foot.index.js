// Initialize the Vue.
let App;

// Instantiate the Vue.
if( $('#eul-vue').length > 0 ) App = new Vue({el: '#eul-vue'});

// Export globals.
global._ = _;
global.Vue = Vue;
global.Events = Events;
global.Components = Components;
global.Store = Store;
global.Leaflet = global.L = L;
global.Hammer = Hammer;
global.jQuery = global.$ = $;
global.EUL = EUL;
global.App = App;
global.moment = moment;
