var geoData = '../Data_Resources/Coordinate_Data/updated_world.json'
// Load in geojson data -> we don't need with when we're using a db
//var geoData = "static/data/provinces_language.json";

d3.json(geoData, function (data) {
  // The endpoint that we created to give us our data
  var baseMaps = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: 'mapbox/streets-v11',
      color: 'white',
      accessToken: API_KEY
    }
  )

  var myMap = L.map('map', {
    center: [40.52, -0.0],
    zoom: 2.5,
    layers: [baseMaps]
  })

  baseMaps.addTo(myMap)

  console.log(data)
  console.log(data.features)

  function styleInfo(feature) {
    return {
      // Define what  property in the features to use, we can update this line to show a different year.
      valueProperty: feature.properties.year_temp_2013,
      // Set color scale
      scale: ['#ffffb2', '#b10026'],
      // Number of breaks in step range
      steps: 4,
      // q for quartile, e for equidistant, k for k-means
      mode: 'q',
      // Border color
      color: 'white',
      weight: 1,
      fillColor: feature.properties.year_temp_2013,
      fillOpacity: 0.1
    }
  }

  // Create a new choropleth layer for temperature
  var geojson = L.geoJson(data, {
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        'Country: ' +
          feature.properties.name +
          '<br>Temperature:<br>' +
          Math.round(feature.properties.year_temp_2013, 2) +
          '°C'
      )
    },
    pointToLayer: function (feature, latlng) {
      return L.choropleth(latlng)
    }
  }).addTo(myMap)
  // Sending our earthquakes layer to the createMap function

  // Create a new choropleth layer for emissions
  var geojson = L.geoJson(data, {
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        'Country: ' +
          feature.properties.name +
          '<br>Temperature:<br>' +
          Math.round(feature.properties.year_temp_2013, 2) +
          '°C'
      )
    },
    pointToLayer: function (feature, latlng) {
      return L.choropleth(latlng)
    }
  }).addTo(myMap)

  // Set up the legend
  var legend = L.control({ position: 'bottomright' })
  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = geojson.options.limits
    var colors = geojson.options.colors
    var labels = []

    // Add min & max
    var legendInfo =
      '<h1>Yearly Average Temperature</h1>' +
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
  }
  legend.addTo(myMap);
})

//   Close createFeature function

// L.control
//   .layers(overlayMaps, {
//     collapsed: false
//     // Add the layer control to the map
//   })
//   .addTo(myMap)


