const { response } = require("express");
const prisma = require("../prisma/prisma");
const recomSongController = require('../controllers/recomController');

// utk session setiap user
exports.listenSessionById = async (req, res) => {
    const listenId  = req.params.listenId;
    const userId = req.body.user_id;
    const bpm = req.body.bpm;

    if (!bpm) {
        return res.status(400).json({ message: 'BPM is required' });
      }

    try {
        const listenSession = await prisma.listenSession.create({
            data: {
                user_id: userId
            }
        });
        
        // panggil model
        let recommendedSongs = []; 
        const BASE_URL = process.env.BASE_URL;
        try {
        const response = await fetch(`${BASE_URL}/recommend`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ HR: bpm }), // Send BPM to recommendation service
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error from recommendation service:', error);
            res.status(500).json({ message: 'Error fetching recommendations' });
            return;
          }

        const data = await response.json();
        recommendedSongs = data; // Assuming the response contains an array of songs 
        } catch (error) {
            console.error('Error calling recommendation model:', error);
            res.status(500).json ({
            message: 'Failed to recommend songs',
        });
            return; // Stop execution if recommendation fails
        }
    
        for (const songId of recommendedSongs) {
        const existingSong = await prisma.song.findUnique({
            where: { 
                song_id: songId 
            }
        });

        // dilihat apakah ada lagu di dalam database
        if (!existingSong){
            await prisma.song.create({
                data: {
                        song_id: songId,
                    }    
                }); 
            } else {
                console.log(`Lagu dengan ID ${song.song_id} sudah ada di database.`);
            }
        }    
        
        //nambahin lagu ke db session
        const session = await prisma.session.createMany({
            data: recommendedSongs.map(songId => ({
                song_id: songId,
                listen_id: listenSession.listen_id
            })),
        });
        
        // Untuk mengambil data lagu
        const songsData = await prisma.song.findMany({
            where: {
                song_id: {
                    in: recommendedSongs.filter(
                        songId => songId !== undefined).map(songId => songId)
                }
            }
        });
        res.status(200).json({ 
            "status": true,
            "message": "Song added to session",
            "data": {
                "session": session,
                "data songs": songsData 
            }
        })
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating session' });
        }    
}

// buat ngeliat semua listensession dari beberapa user
exports.getAllListenSession = async (req, res) => {
    try {
        const sessions = await prisma.listenSession.findMany(
            {
                select: {
                    listen_id: true,
                    user_id: true,
                  }
        });
        res.status(200).json({
        "status": true,
        "message": "Listen sessions retrieved successfully",
        "data": sessions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving listen sessions' });
    }
};


// buat ngeliat semua listensession dari spesifik user
exports.getlistenSessionByUser = async (req, res) => {
    const userId = req.params.user_id; 
    const sessions = await prisma.listenSession.findMany({
        where: {
            user_id: userId
        },
        select: {
            listen_id: true 
        }
    });
    if (!sessions) {
        return res.status(404).json({
            "status": false,
            "message": "Listen session not found",
        });
    }
    res.status(200).json({
        "status": true,
        "message": "Listen session retrieved successfully",
        "data": sessions,
    });
};

