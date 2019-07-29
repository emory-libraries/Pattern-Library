// Load dependencies.
const converter = require('hex2dec');

// Export helpers.
module.exports = {
  
  googleMapEmbedUrl( placeData, zoomLevel ) {
    
    // Intialize some utilies.
    const util = {
      
      zoom( level ) {
        
        // Set base zoom level, equivalent to a zoom level of 1z.
        let zoom = 124278345.5600695;
        
        // Calculate zoom.
        for( let i = 1; i <= level; i++ ) { zoom /= 2; }
        
        // Return zoom level.
        return zoom;
        
      }
      
    };
    
    // Extract data needed to create the embed URL.
    const {name, cid} = placeData;
    const coords = placeData.geometry.location;
    
    // Convert CID to hex.
    const hexcid = converter.decToHex(cid);
    
    // Set place card status. This will get inversed, where 0 = show and 1 = hide.
    const showPlaceCard = true;
    
    // Set map view mode, where 0 = map and 1 = satellite.
    const mapViewMode = 0;
    
    // Initialize other URL parameters that Google uses by default.
    const params = {
      
      // Resolution: horizontal (x), vertical (y), and diagonal (d)
      rez: {
        x: 1024,
        y: 768,
        d: 13.1
      }
      
    };
    
    // Initialize embed URL.
    let url = 'https://www.google.com/maps/embed?pb=!1m14!1m8';
    
    // Set the map's zoom level and coordinates.
    url += `!1m3!1d${util.zoom(zoomLevel)}!2d${coords.lng}!3d${coords.lat}`;
    
    // Set the map's relative resolution.
    url += `!3m2!1i${params.rez.x}!2i${params.rez.y}!4f${params.rez.d}`;
    
    // Set the map's marker/place card.
    url += `!3m3!1m2!1s${+!showPlaceCard}x0:${hexcid}!2s${name.split(' ').join('+')}`;
    
    // Set map view mode.
    url += `!5e${mapViewMode}`;
    
    // Return the embed URL.
    return url;
  
  }
  
};