// Initialize the map method.
module.exports = function() {
  
  // Make async.
  const done = this.async();
  
  // Load dependencies.
  const _ = require('lodash');
  const path = require('path');
  const fs = require('fs-extra');
  const grunt = require('grunt');
  const axios = require('axios');
  const type = require('type-of');
  const inquirer = require('inquirer');
  const chalk = require('chalk');
  const link = require('terminal-link');
  
  // Extend lodash.
  _.camelify = function( object ) {
    
    // Initialize utilities.
    const util = {
      primitive: ( primitive ) => _.camelCase(primitive),
      object( object ) {
        
        // Initialize result.
        const result = {};
        
        // Handle each key-value pair.
        _.each(object, (value, key) => {
          
          // Handle objects.
          if( type(value) == 'object' ) result[this.primitive(key)] = this.object(value);
          
          // Handle arrays.
          else if( type(value) == 'array' ) result[this.primitive(key)] = this.array(value);
          
          // Otherwise, handle primitives.
          else result[this.primitive(key)] = value;
          
        });
        
        // Return the result.
        return result;
        
      },
      array( array ) {
        
        // Initialize result.
        const result = [];
        
        // Handle each value.
        _.each(array, (value) => {
          
          // Handle objects.
          if( type(value) == 'object' ) result.push(this.object(value));
          
          // Handle arrays.
          else if( type(value) == 'array' ) result.push(this.array(value));
          
          // Otherwise, handle primitives.
          else result.push(value);
          
        });
        
        // Return the result.
        return result;
        
      }
    };
    
    return util.object(object);
    
  };
  
  // Exit if environment file does not exist.
  if( !fs.existsSync(path.resolve('env.json')) ) {
    
    // Throw error.
    grunt.warn('Could not find `env.json` at project root.', 3);
    
    // Exit.
    return;
    
  }
  
  // Load configurations.
  const env = require(path.resolve('env.json'));
  const config = require(path.resolve('patternlab-config.json'));

  // Load default place data.
  let places = require(path.resolve(config.paths.source.data, 'map.json'));

  // Verify that a Google Places API key exists.
  if( !env.GOOGLE_PLACES_API || !env.GOOGLE_PLACES_API.key ) {

    // Throw error.
    grunt.warn('Missing `GOOGLE_PLACES_API.key` in `env.json`.', 3);

    // Exit.
    return;

  }

  // Configure the Google Places API.
  class GooglePlacesAPI {

    constructor() {
      this.key = env.GOOGLE_PLACES_API.key;
      this.fields = [
        'plus_code',
        'address_component',
        'adr_address',
        'formatted_address',
        'vicinity',
        'geometry',
        'scope',
        'url',
        'utc_offset'
      ];
      this.src = 
      this.src = `https://maps.googleapis.com/maps/api/place/details/json?key=${this.key}&fields=${this.fields}`;
    }

    getData( placeID ) {

      return axios.get(`${this.src}&placeid=${placeID}`);

    }

  }
  
  // Initialize links.
  const links = [
    link('Google Maps Pricing', 'https://cloud.google.com/maps-platform/pricing/sheet'),
    link('Places API Usage and Billing', 'https://developers.google.com/places/web-service/usage-and-billing')
  ];
  
  // Confirm that the user wishes to use the Google Places API.
  inquirer.prompt([{
    name: 'confirm',
    required: true,
    default: false,
    type: 'confirm',
    message: chalk`{reset {bold.red Disclaimer:} Continuing will use the {bold Google Places API}, which is subject to usage costs. Refer to {cyan ${links[0]}} and {cyan ${links[1]}} for detailed pricing information and per-request transaction fees. By proceeding, you understand that your account may be billed accordingly.\n\nDo you wish to continue?}`
  }]).then((answers) => {
    
    // Exit if not confirmed.
    if( !answers.confirm ) return;

    // Initialize the API.
    const API = new GooglePlacesAPI();

    // Initialize our output data.
    const data = _.extend({}, places);

    // Initialize requests and errors.
    const requests = [];
    const errors = [];

    // Report that place data will be retrieved.
    grunt.log.write('Retrieving place data from Google Places... ');

    // Retrieve data for our places.
    places.map.forEach((place, i) => {

      // Get and save the data.
      requests.push(API.getData(place.placeID).then((response) => {

        // Get place data.
        const placeData = response.data.result;

        // Extract Google CID.
        placeData.cid = +placeData.url.replace('https://maps.google.com/?cid=', '');

        // Save place data.
        data.map[i] = _.merge({}, place, _.camelify(placeData));

      }).catch(() => errors.push(`Could not retrieve place data for ${place.name}.`)));

    });

    // Wait until all place data is retrieved.
    axios.all(requests).then(() => {

      // Report that all place data was retrieved.
      grunt.log.write('Done.');

      // Save all the data.
      fs.writeJsonSync(path.resolve(config.paths.source.data, 'map.json'), data, {spaces: 2});

      // Finished.
      done();

    });
    
  });
  
};