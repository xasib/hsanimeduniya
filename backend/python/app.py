from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

OWNER_EMAIL = "hshasibhasan@gmail.com"

# In-memory database simulation
videos_db = [
    {
        "id": "v1",
        "title": "Demon Slayer: Infinity Castle",
        "category": "Shonen",
        "language": "Hindi",
        "status": "approved",
        "ownerEmail": OWNER_EMAIL
    }
]

@app.route('/api/videos', methods=['GET'])
def get_videos():
    approved = [v for v in videos_db if v['status'] == 'approved']
    return jsonify(approved)

@app.route('/api/videos', methods=['POST'])
def create_video():
    data = request.json
    data['id'] = f"v_{len(videos_db) + 1}"
    if data.get('ownerEmail') == OWNER_EMAIL:
        data['status'] = 'approved'
    else:
        data['status'] = 'pending'
    videos_db.append(data)
    return jsonify(data), 201

if __name__ == '__main__':
    app.run(port=5000, debug=True)
