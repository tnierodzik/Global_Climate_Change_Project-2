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


### Data Cleaning - Extraction

* 3 data sources are used:
  * Temperature Data
  * Energy Data
  * GeoJSON Data

* Downloaded csv and geoJSON data files 

* Extracted data using pandas in Python

* Data Cleaning process involved below steps:
  * Drop rows containing N/A values 
  * Renamed and dropped unnecessary columns
  * Merged CSV files together
  * Created new dictionary within geojson file containing temperature and energy emission
  
* Created MongoDB data and loaded a modified geojson file and a modified Energy consumption file



### Questions to Answer:

* Climate change - is it real?
	* Yes, climate change is very real. As time increases global average temperatures are increasing.
* Energy consumption effects on global average temperatures?
  * There is a correlation between energy consumption and global temperatures. Dramatic increasing in energy consumption from 1950 to 2013.
