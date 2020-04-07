import mturk_utils
import os
import pymongo 
import json
from bson.objectid import ObjectId
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Mturk
with open(os.path.join(os.path.dirname(__file__), "res", "mturk_config.json")) as f:
    mturk_config = json.load(f)
mturk_client = mturk_utils.init_client(mturk_config["general_config"])

# MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["train_sketches"]
col = db["pairs_test"]
col2 = db["sketch_pairs_test"]

@app.route("/api/load_sketches", methods=['GET'])
def load_sketches(): 
    sample = col.find_one_and_update({'lock': False}, {'$set': {'lock': True}})
    return jsonify(strokes1 = sample["strokes1"], z1 = sample["z1"], strokes2 = sample["strokes2"], z2 = sample["z2"])

@app.route("/")
def rules():
    return render_template("index.html")

@app.route("/consent")
def consent():
    return render_template("index.html")

@app.route("/api/inputs", methods=['POST'])
def submit_post():
    if request.method == 'POST':
        doc = json.loads(request.data.decode('utf-8'))
        col2.insert_one(doc)
        return "post succeeded"
    return "not a post"

@app.route('/api/hits/resume')
def resume_hit(): 
    hit_id = request.args.get('hitId')
    mturk_utils.resume_hit(mturk_client, hit_id)
    return jsonify({"status": "success"}), 200

@app.route('/api/hits/pause')
def pause_hit(): 
    hit_id = request.args.get('hitId')
    mturk_utils.pause_hit(mturk_client, hit_id)
    return jsonify({"status": "success"}), 200

@app.route('/api/hits', methods=["GET", "POST"])
def create_hit():
#    if request.method == "GET":
#       hits_res = mturk_utils.get_all_hits(mturk_client)
#       hit_id = hits_res['HITs'][0]['HITId']
#       print("Assignment", mturk_utils.get_assignments(mturk_client, hit_id))
#       #print("MTurk API HITs Result: ", hits_res)
#       return jsonify({"status": "success"}), 201
#    else:
    #   data = request.get_json(force=True)
    #   target = data.get("target")
    #   print(target)
      hit_config = mturk_config["comparison_hit"]
      hit_config["Question"] = open(os.path.join(os.path.dirname(__file__), "res/comparison_question.xml")).read()
      res = mturk_utils.post_hit(mturk_client, hit_config)
      return jsonify(res), 201

if __name__ == '__main__': 
    app.config.from_object('configurations.DevelopmentConfig') 
    # context = ('server.crt', 'server.key')
    # app.run(debug=True, ssl_context=context)
    app.run(debug=True, port=8001)
