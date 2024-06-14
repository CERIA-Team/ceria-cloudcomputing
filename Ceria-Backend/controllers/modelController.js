const express = require('express');
const recommendModel = require('../modules/model');

exports.recommendSong = async (req,res) => {
    const  bpm = req.body.bpm;
    if (!bpm) {
        return res.status(400).json({ message: 'BPM harus diisi' });
    }
    try {
        const recommendedSongIds = await recommendModel.recommend(bpm);
      // Dapatkan detail lagu dari database berdasarkan ID yang direkomendasikan
        const recommendedSongs = await prisma.song.findMany({
        where: {
          song_id: { 
            in: recommendedSongIds 
            },
        },
    });
      return res.status(200).json({
        "message": 'songs recommended sucessfully',
        "data": recommendedSongs
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 
        status: false,
        message: 'Internal server error' });
    }
  
}