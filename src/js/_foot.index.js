// Instantiate the vue.
const App = new Vue({el: '#eul-vue'});

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
