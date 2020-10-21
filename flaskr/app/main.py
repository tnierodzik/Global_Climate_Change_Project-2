from flask import Flask, render_template, jsonify

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Create an instance of our Flask app.
app = Flask(__name__)

# connect to the local DB
client = pymongo.MongoClient("mongodb://localhost:27017")
db1 = client.global_climate
db2 = client.energy_consumptions


# Set route
@app.route('/')
def index():
    # Return the template with the teams list passed in
    return render_template('index.html')#, teams=teams)

# Set the route for climate data
@app.route('/climate')
def climate():
    #Pulling the data from the database
    climate_data = list(db1.climate_data.find({}, {'_id': False}))
    
    #jsonifying it and returning it to the frontend
    return jsonify({'features': climate_data})

# Set the route for energy data
@app.route('/energy')
def energy():
    #Pulling the data from the database
    energy_data = list(db2.energy.find({}, {'_id': False}))
    
    #jsonifying it and returning it to the frontend
    return jsonify(energy_data)

if __name__ == "__main__":
    app.run(debug=True)