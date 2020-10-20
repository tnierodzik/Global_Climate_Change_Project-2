// Creating map object
var myMap = L.map("map", {
  center: [37.611251, 2.742210],
  zoom: 2.5
});

// Set up the legend
var legend = L.control({ position: 'bottomleft' })


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
var url = '/climate'

var data

// Fetch and read the data from the API
d3.json(url, function (d) {
  data = d;
  updateMap(1950)
})


// Created a function to update the map
function updateMap(year) {
  myMap.eachLayer(layer => myMap.removeLayer(layer))
  myMap.removeControl(legend)

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  console.log(data);

  geojson = L.choropleth(data, {
    // Define what  property in the features to use, we can update this line to show a different year.
    valueProperty: `year_temp_${year}`,
    // Set color scale
    limits: [-10, -5, 0, 5, 10, 15, 20, 25, 30, 35],
    scale: ['#4560EB', '#575BD8', '#6955C4', '#7B4FB1', '#8D4A9D', '#A0448A', '#B23F76', '#C43963', '#D6334F', '#E82E3C'],

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
        (+feature.properties[`year_temp_${year}`]).toFixed(2) +
        '°C');
    }
  })

  // Add the legend
  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = geojson.options.limits
    var colors = geojson.options.colors
    var labels = []
    // Add min & max
    var legendInfo =
      `<h4 style="text-align:center"> Year: ${year}</h4>` +
      '<h6 style="text-align:center">Average Temperature</h6>' +
      '<div class="labels">' +
      '<div class="min">' +
      `${-10}` +
      '</div>' +
      '<div class="max">' +
      `${30}+` +
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
  myMap.addLayer(geojson)
  // energyConsumption(year)
}

// Updated the 'slider'
document
  .getElementById('slider')
  .addEventListener('input', function (e) {
    var year = parseInt(e.target.value, 10);
    updateMap(year)
    //filterBy(year);
  });



// Created a function for updating the energy data

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
      // title: "Global direct primary energy consumption",
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