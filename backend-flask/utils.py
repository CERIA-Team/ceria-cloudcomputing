import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier


# Load the DataFrame from the saved CSV file
df_assign = pd.read_csv('filtered_song.csv')

# Ensure that 'intensity' is converted to sets
df_assign['intensity'] = df_assign['intensity'].apply(lambda x: eval(x) if isinstance(x, str) else x)
df_assign['intensity'] = df_assign['intensity'].apply(lambda x: set(x) if isinstance(x, (list, np.ndarray)) else x)

# Load the model and scaler
with open('final_model.bin', 'rb') as model_file:
    model = joblib.load(model_file)

with open('scaler.bin', 'rb') as scaler_file:
    scaler = joblib.load(scaler_file)


def recommend_songs(predicted_intensity, df_assign, num_songs=5):
    # Filter songs matching predicted intensity
    recommended_df = df_assign[df_assign['intensity'].apply(lambda x: predicted_intensity in x)].copy()

    # If no songs match the exact intensity, expand to adjacent intensities
    if recommended_df.empty:
        if predicted_intensity == 0:
            recommended_df = df_assign[df_assign['intensity'].apply(lambda x: 1 in x)].copy()
        elif predicted_intensity == 3:
            recommended_df = df_assign[df_assign['intensity'].apply(lambda x: 2 in x)].copy()
        else:
            recommended_df = df_assign[df_assign['intensity'].apply(lambda x: (predicted_intensity - 1 in x) or (predicted_intensity + 1 in x))].copy()

    # Apply popularity-based weighting for random selection
    recommended_df['weight'] = recommended_df['popularity'].apply(
        lambda pop: 1 if pop > 60 else (0.2 if 45 < pop <= 60 else 0.01)
    )

    # If not enough songs after filtering and weighting, recommend whatever is available
    if len(recommended_df) < num_songs:
        num_songs = len(recommended_df)

    # Randomly select songs based on weighted probability
    recommended_songs = recommended_df.sample(n=num_songs, weights='weight')

    return recommended_songs[['track_id','track_name', 'artists', 'track_genre', 'intensity', 'energy','popularity']]

# Example usage
Hr = 120

# Create DataFrame for prediction
new_data = pd.DataFrame({
    'HR': [Hr],
})

# Scale input and predict intensity
new_data_scaled = scaler.transform(new_data)
predicted_intensity = model.predict(new_data_scaled)[0]

# Get song recommendations
recommendations = recommend_songs(predicted_intensity, df_assign, 3)
print(recommendations)