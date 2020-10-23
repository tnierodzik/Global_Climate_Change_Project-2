# Global Climate Change Dashboard

![img](https://github.com/tnierodzik/Global_Climate_Change_Project-2/blob/cleanup_data_1/flaskr/app/static/images/banner_image.jpg)<br>

Global warming is having devastating effects on the world; extreme weather, rising sea levels, flooding, droughts and storms are all on the rise.

Global temperatures have been increasing ever since the Industrial Revolution, and aren’t showing any signs of improvement. It is estimated atmospheric concentrations of CO2 have increased by 47% since 1850. CO2 naturally changes this significantly over a 20,000 year period (from the Last Glacial Maximum to 1850, from 185 ppm to 280 ppm). Large quantities of CO2 are being released in the atmosphere through energy consumption. In 2015, burning fossil fuels accounts for two thirds of all CO2 production. Without any action, global temperature will continue to increase and will dramatically alter the world we live in.

The detailed map visualizes global temperature changes over time. Map contains several layers to filter and compare temperatures to various factors.

## ETL (Extraction, Transformation & Load)

### Data Sources:

* Coordinate Data 
  * Choropleth Country Outline
  * Geojson file
    https://github.com/johan/world.geo.json

* Global Temperature Data
   * Average Monthly Temperature Data
   * Excel Spreadsheet
      https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-    data?select=GlobalLandTemperaturesByCountry.csv

* Energy Consumption Data
  * Yearly Energy Consumption by Type
  * Excel Spreadsheet
    https://ourworldindata.org/energy


### Data Cleaning & Extraction:

* 3 data sources are used:
  * Temperature Data
  * Energy Data
  * GeoJSON Data

* Downloaded csv and geoJSON data files 

* Extracted data using pandas in Python

* Dropped rows containing N/A values and renamed and dropped unnecessary columns

* Merged data frames together using an inner-join

* Parsed temperature and emissions data for the same years

* Created new GeoJSON properties containing temperature and energy emission data
  
* Created MongoDB data and loaded a modified geojson file and a modified Energy consumption file

## Flask API:

Click here to view [FLASK API](https://github.com/tnierodzik/Global_Climate_Change_Project-2/blob/cleanup_data_1/flaskr/app/main.py)


## Final Look of the webpage:

The final look of the webpage is below:

![img](https://github.com/tnierodzik/Global_Climate_Change_Project-2/blob/cleanup_data_1/screenshots/webpage.png)


## Conclusions:

* Climate change is very real. As time increases, the average global temperature is slowly increasing.
  * The average temperature of Canada in 1950 was -5.95°C compared to -1.64°C in 2013
  * The average temperature of America in 1950 was 8.66°C compared to 11.30°C in 2013 

* Energy consumption has been increasing exponentially for the past century. 
  * There is a positive correlation between energy consumption and average global temperatures
  * 5 different energy resources consumed in 1950 compared to 10+ in 2013 
  * 5 times as much coal and 10 times more oil consumed in the same time frame


