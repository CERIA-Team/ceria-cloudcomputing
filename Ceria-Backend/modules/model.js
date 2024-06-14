const tf = require('@tensorflow/tfjs-node');
const loadModel = require('../modules/loadModel');

exports.recommend = async (bpm) => {
  const model = await loadModel.LoadModel();

  // Contoh data input model
  const inputTensor = tf.tensor([bpm]);

  const prediction = model.predict(inputTensor);
  const recommendedSongIds = prediction.dataSync(); // Anggap output model adalah ID lagu

  return recommendedSongIds;
}
