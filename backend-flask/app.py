from flask import Flask, request, jsonify
from utils import recommend_songs, model, scaler, df_assign
import pandas as pd

app = Flask(__name__)

@app.route('/recommend', methods=['GET'])
def recommend_get():
    hr = request.args.get('HR', type=int)

    if hr is None:
        return jsonify({'error': 'HR parameter is required'}), 400

    # Create DataFrame for prediction
    new_data = pd.DataFrame({
        'HR': [hr],
    })

    # Scale input and predict intensity
    new_data_scaled = scaler.transform(new_data)
    predicted_intensity = model.predict(new_data_scaled)[0]

    # Get song recommendations
    recommendations = recommend_songs(predicted_intensity, df_assign, 3)

    # Format the recommendations to only include track_id
    response = recommendations['track_id'].tolist()

    return jsonify(response)


@app.route('/recommend', methods=['POST'])
def recommend_post():
    user_data = request.json
    hr = user_data['HR']

    # Create DataFrame for prediction
    new_data = pd.DataFrame({
        'HR': [hr],
    })

    # Scale input and predict intensity
    new_data_scaled = scaler.transform(new_data)
    predicted_intensity = model.predict(new_data_scaled)[0]

    # Get song recommendations
    recommendations = recommend_songs(predicted_intensity, df_assign, 3)

    # Format the recommendations as JSON
    response = recommendations['track_id'].tolist()

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
