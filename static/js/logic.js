// Creating map object
var myMap = L.map("map", {
  center: [40.52, -34.34],
  zoom: 2.5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data -> we don't need with when we're using a db
//var geoData = "static/data/provinces_language.json";

var geojson;

// The endpoint that we created to give us our data
// url = '/data'
var geoData = "../Data_Resources/Coordinate_Data/updated_world.json";

// Grab data with d3
d3.json(geoData, function(data) {

  console.log(data)

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use, we can update this line to show a different year.
    valueProperty: "year_temp_2013",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name + "<br>Temperature:<br>" + Math.round(feature.properties.year_temp_2013,2) + '°C');
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Yearly Average Temp.</h1>" +
      "<div class=\"labels\">" +
      "<div class=\"min\">" + Math.round(limits[0]) + "</div>" +
      "<div class=\"max\">" + Math.round(limits[limits.length - 1]) + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});
