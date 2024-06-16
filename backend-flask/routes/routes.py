from flask import Flask, request, jsonify
import pandas as pd
import requests
from services.recommendations import *
from model import *


def configure_routes(app):

    @app.route("/")
    def home():
        message = "Welcome to our machine learning model endpoints."
        return jsonify(message)

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