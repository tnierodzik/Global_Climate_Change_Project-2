function createMap(year) {
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
  // var geoData = "/static/data/updated_world.json";

  var geojson;

  // The endpoint that we created to give us our data
  url = '/climate'

  // Grab data with d3
  d3.json(url, function (data) {

    console.log(data)

    // Create a new choropleth layer
    geojson = L.choropleth(data, {

      // Define what  property in the features to use, we can update this line to show a different year.
      
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

      // Binding a pop-up to each layer
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Country: " + feature.properties.name + "<br>Year:<br>" +
          "$" + feature.properties.year_temp_1957);
      }
    }).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo = "<h1>Global Temperature</h1>" +
        "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function (limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);
  });
};


function energyConsumption() {
  d3.json("/energy", function (incomingData) {

    console.log(incomingData);

    year = incomingData.map(d => d['Year'])

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

createMap(year = 1957)
energyConsumption()




