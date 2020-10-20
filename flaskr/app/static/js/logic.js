// Creating map object
var myMap = L.map("map", {
  center: [40.52, -34.34],
  zoom: 3
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

var url = '/climate'

var data
d3.json(url, function(d) {
data = d;
createMap(1950)
})

function createMap(year) {

  var geojson;

  // Create a new choropleth layer
  geojson = L.choropleth(data, {
    // Define what  property in the features to use, we can update this line to show a different year.
    // id: "heatmap",
    valueProperty: `year_temp_${year}`,
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
   onEachFeature: function (feature, layer) {
   layer.bindPopup(
      'Country: ' +
        feature.properties.name +
        '<br>Temperature:<br>' +
        Math.round(feature.properties.year_temp_2013, 2) +
        '°C');
    }
  }).addTo(myMap);  
  // Set up the legend
  var legend = L.control({ position: 'bottomright' })
  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = geojson.options.limits
    var colors = geojson.options.colors
    var labels = []
  // Add min & max
  var legendInfo =
    '<h6>Average Temperature</h6>' +
    '<div class="labels">' +
    '<div class="min">' +
    Math.round(limits[0]) +
    '</div>' +
    '<div class="max">' +
    Math.round(limits[limits.length - 1]) +
    '</div>' +
    '</div>'
  div.innerHTML = legendInfo
  limits.forEach(function (limit, index) {
    labels.push('<li style="background-color: ' + colors[index] + '"></li>')
  })
  div.innerHTML += '<ul>' + labels.join('') + '</ul>'
  return div
  };
  // Adding legend to the map
  legend.addTo(myMap);

  document
    .getElementById('slider')
    .addEventListener('input', function(e) {
    var year = parseInt(e.target.value, 10);
    console.log(year)
    updateMap(year)
    });
};



function updateMap(year){
  myMap.eachLayer(layer => myMap.removeLayer(layer))
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  geojson = L.choropleth(data, {
    // Define what  property in the features to use, we can update this line to show a different year.
    id: "heatmap",
    valueProperty: `year_temp_${year}`,
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
   onEachFeature: function (feature, layer) {
   layer.bindPopup(
      'Country: ' +
        feature.properties.name +
        '<br>Temperature:<br>' +
        Math.round(feature.properties[`year_temp_${year}`], 2) +
        '°C');
    }
  })
  myMap.addLayer(geojson)
}



function energyConsumption() {
  d3.json("/energy", function (incomingData) {
    console.log(incomingData);
    year = incomingData.map(d => d["Year"])
    var plotDiv = document.getElementById('plot');
    var traces = [
      { x: year, y: incomingData.map(d => d['Biofuels (TWh; direct energy)']), stackgroup: 'one', name: "Biofuels" },
      { x: year, y: incomingData.map(d => d['Coal (TWh; direct energy)']), stackgroup: 'one', name: "Coal" },
      { x: year, y: incomingData.map(d => d['Gas (TWh; direct energy)']), stackgroup: 'one', name: "Gas" },
      { x: year, y: incomingData.map(d => d['Hydropower (TWh; direct energy)']), stackgroup: 'one', name: "Hydropower" },
      { x: year, y: incomingData.map(d => d['Nuclear (TWh; direct energy)']), stackgroup: 'one', name: "Nuclear" },
      { x: year, y: incomingData.map(d => d['Oil (TWh; direct energy)']), stackgroup: 'one', name: "Oil" },
      { x: year, y: incomingData.map(d => d['Other renewables (TWh; direct energy)']), stackgroup: 'one', name: "Other renewables" },
      { x: year, y: incomingData.map(d => d['Solar (TWh; direct energy)']), stackgroup: 'one', name: "Solar" },
      { x: year, y: incomingData.map(d => d['Traditional biomass (TWh; direct energy)']), stackgroup: 'one', name: "Traditional Biomass" },
      { x: year, y: incomingData.map(d => d['Wind (TWh; direct energy)']), stackgroup: 'one', name: "Wind" }
    ];
    
  var layout = {
    title: "Global direct primary energy consumption",
    xaxis: {
      title: "Year"
    },
    yaxis: {
      title: "Energy Consumption (in TWh)"
    }
  }

  Plotly.newPlot('chart', traces, layout);
})
}

//createMap(year = 1957)
energyConsumption()
