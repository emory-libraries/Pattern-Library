// Load dependencies.
const moment = require('moment');
const type = require('type-of');
const _ = require('lodash');

// Export helpers.
module.exports = {
  
  formatPhone( number, format ) {
    
    // Get the number without any characters.
    number = number.toString().replace(/[^0-9]/, '');
    
    // Get all digits  phone number into its digits.
    const digits = number.split('');
    
    // Initialize index for digits.
    let i = 0;
    
    // Return the formatted phone number.
    return format.split('').map((char) => {
      
      // Only update placeholder characters.
      if( ['x', '0', '#'].includes(char.toLowerCase()) ) {
      
        // Substitute a digit for the placeholder.
        char = digits[i];

        // Increment the digit index.
        i++;
        
      }
      
      // Return the character.
      return char;
      
    }).join('');
    
  },
  
  formatCurrency ( number, decimals ) {
    
    // Use two decimal places by default.
    if( type(decimals) == 'object' ) decimals = 2;
    
    // Return the currency in USD.
    return '$' + parseFloat(number).toFixed(decimals);
  
  },

  formatDate: ( date, format ) => moment(date).format(format),
  
  formatAddress( address, format ) {
    
    // Build state formats.
    const states = [
      
      // States
      {"long": "Alabama", "short": "AL"},
      {"long": "Alaska", "short": "AK"},
      {"long": "Arizona", "short": "AR"},
      {"long": "Arkansas", "short": "AR"},
      {"long": "California", "short": "CA"},
      {"long": "Colorado", "short": "CO"},
      {"long": "Connecticut", "short": "CT"},
      {"long": "Delaware", "short": "DE"},
      {"long": "Florida", "short": "FL"},
      {"long": "Georgia", "short": "GA"},
      {"long": "Georgia", "short": "GA"},
      {"long": "Hawaii", "short": "HI"},
      {"long": "Idaho", "short": "ID"},
      {"long": "Illinois", "short": "IL"},
      {"long": "Indiana", "short": "IN"},
      {"long": "Iowa", "short": "IA"},
      {"long": "Kansas", "short": "KS"},
      {"long": "Kentucky", "short": "KY"},
      {"long": "Louisiana", "short": "LA"},
      {"long": "Maine", "short": "ME"},
      {"long": "Maryland", "short": "MD"},
      {"long": "Massachusetts", "short": "MA"},
      {"long": "Michigan", "short": "MI"},
      {"long": "Minnesota", "short": "MN"},
      {"long": "Mississippi", "short": "MS"},
      {"long": "Missouri", "short": "MO"},
      {"long": "Montana", "short": "MT"},
      {"long": "Nebraska", "short": "NE"},
      {"long": "Nevada", "short": "NV"},
      {"long": "New Hampshire", "short": "NH"},
      {"long": "New Jersey", "short": "NJ"},
      {"long": "New Mexico", "short": "NM"},
      {"long": "New York", "short": "NY"},
      {"long": "North Carolina", "short": "NC"},
      {"long": "North Dakota", "short": "ND"},
      {"long": "Ohio", "short": "OH"},
      {"long": "Oklahoma", "short": "OK"},
      {"long": "Oregon", "short": "OR"},
      {"long": "Pennsylvania", "short": "PA"},
      {"long": "Rhode Island", "short": "RI"},
      {"long": "South Carolina", "short": "SC"},
      {"long": "South Dakota", "short": "SD"},
      {"long": "Tennessee", "short": "TN"},
      {"long": "Texas", "short": "TX"},
      {"long": "Utah", "short": "UT"},
      {"long": "Vermont", "short": "VT"},
      {"long": "Virginia", "short": "VA"},
      {"long": "Washington", "short": "WA"},
      {"long": "West Virginia", "short": "WV"},
      {"long": "Wisconsin", "short": "WI"},
      {"long": "Wyoming", "short": "WY"},
      
      // Territories
      {"long": "American Samoa", "short": "AS"},
      {"long": "District of Columbia", "short": "DC"},
      {"long": "Guam", "short": "GU"},
      {"long": "Marshall Islands", "short": "MH"},
      {"long": "Northern Marianas", "short": "MP"},
      {"long": "Palaus", "short": "PW"},
      {"long": "Puerto Rico", "short": "PR"},
      {"long": "Virgin Islands", "short": "VI"}
      
    ];
    
    // Format the address.
    _.each(address, (value, key) => {
      
      // Find placeholder within the format.
      let placeholder = format.match(new RegExp(`\\{(${key}(?:\\..+?)?)\\}`));
      
      // Skip address parts without a placeholder.
      if( !placeholder ) return;
      
      // Get the placeholder ID.
      const id = placeholder[1].split('.');
      
      // Apply any format modifications to the value.
      if( id[0] == 'state' && ['long', 'short'].includes(id[1]) ) value = _.find(states, {long: value})[id[1]];
      
      // Merge data into the format.
      format = format.replace(placeholder[0], value);
      
    });
    
    // Return the formatted address.
    return format;

  }
  
};