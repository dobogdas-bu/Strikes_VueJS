import { ref } from "vue";
const googleMapsApiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY

let autocomplete;
let fillInAddress= ref(null);

const loadGoogleMaps = (field)=>{
  
// Create the script tag, set the appropriate attributes
var script = document.createElement('script')
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=initMap`

script.async = true

// Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
  autocomplete = new google.maps.places.Autocomplete(field,
    {
        types: ['establishment'],
        componentRestrictions: {'country':['US']},
        fields: ['address_components','name']
    
    })
    autocomplete.addListener("place_changed", fillInAddress.value);

    
    
};

// Append the 'script' element to 'head'
document.head.appendChild(script)


}




export { loadGoogleMaps, fillInAddress, autocomplete }