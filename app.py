import os
from flask import Flask, render_template
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://localhost:27017/tree_sketch_collection"
mongo = PyMongo(app)
app.json_encoder = JSONEncoder

@app.route("/compare")
def load_comparison():
    return render_template("index.html")

if __name__ == "__main__":
    app.config.from_object('configurations.DevelopmentConfig')
    app.run(debug=True)
    