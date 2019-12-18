// Load dependencies.
//
// NOTE: If not using a module bundler, like Browserify or Webpack, this will not work.
// Instead, you will need to manually load these dependencies in the browser using `<script>` tags.
const _ = require('lodash');
const Vue = require('vue');
//const L = require('leaflet');
const Hammer = require('hammerjs');
const $ = require('jQuery');
const {compareTwoStrings} = require('string-similarity');
const moment = require('moment');
const RSS = require('rss-parser');
const he = require('he');

// Change the Vue delimiters globally.
Vue.options.delimiters = ['<%', '%>'];
