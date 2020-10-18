
function energyConsumption(){
  d3.csv("js/Data_Resources/Energy_Consumption/global-primary-energy.csv", function(incomingData) {
    
    console.log(incomingData);

    year = incomingData.map(d => d['Year'])
    
    var plotDiv = document.getElementById('plot');

    var traces = [
      {x: year, y: incomingData.map(d => d['Biofuels (TWh; direct energy)']), stackgroup: 'one', name: "Biofuels"},
      {x: year, y: incomingData.map(d => d['Coal (TWh; direct energy)']), stackgroup: 'one', name: "Coal"},
      {x: year, y: incomingData.map(d => d['Gas (TWh; direct energy)']), stackgroup: 'one', name: "Gas"},
      {x: year, y: incomingData.map(d => d['Hydropower (TWh; direct energy)']), stackgroup: 'one', name: "Hydropower"},
      {x: year, y: incomingData.map(d => d['Nuclear (TWh; direct energy)']), stackgroup: 'one', name: "Nuclear"},
      {x: year, y: incomingData.map(d => d['Oil (TWh; direct energy)']), stackgroup: 'one', name: "Oil"},
      {x: year, y: incomingData.map(d => d['Other renewables (TWh; direct energy)']), stackgroup: 'one', name: "Other renewables"},
      {x: year, y: incomingData.map(d => d['Solar (TWh; direct energy)']), stackgroup: 'one', name: "Solar"},
      {x: year, y: incomingData.map(d => d['Traditional biomass (TWh; direct energy)']), stackgroup: 'one', name: "Traditional Biomass"},
      {x: year, y: incomingData.map(d => d['Wind (TWh; direct energy)']), stackgroup: 'one', name: "Wind"}
    ];

    var layout = {
      title: "Global direct primary energy consumption",
      xaxis : {
        title: "Year"
      },
      yaxis : {
        title: "Energy Consumption (in TWh)"
      }
    }
    
    Plotly.newPlot('chart', traces, layout);
  })
}

energyConsumption()
