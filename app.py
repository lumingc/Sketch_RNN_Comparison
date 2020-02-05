import os
import pymongo 
from flask import Flask, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["train_sketches"]
col = db["big_stroke_sketches_and_z"]

@app.route("/api/load_sketches", methods=['GET'])
def load_sketches():
    # sample sketches 
    sketch_1 = list(col.aggregate([{"$sample": {"size": 1}}]))[0]
    sketch_2 = list(col.aggregate([{"$sample": {"size": 1}}]))[0]
    #replace the unhashable object id with str
    sketch_1["_id"] = str(sketch_1["_id"])
    sketch_2["_id"] = str(sketch_2["_id"])
    # make sure sketch 1 and 2 are not the same
    while str(sketch_2["_id"]) == str(sketch_1["_id"]):
        sketch_2 = list(col.aggregate([{"$sample": {"size": 1}}]))[0]
    return jsonify(strokes1 = sketch_1["strokes"], z1 = sketch_1["z"], strokes2 = sketch_2["strokes"], z2 = sketch_2["z"])

@app.route("/")
def compare():
    return render_template("index.html")

if __name__ == "__main__":
    app.config.from_object('configurations.DevelopmentConfig')
    app.run(debug=True)
    