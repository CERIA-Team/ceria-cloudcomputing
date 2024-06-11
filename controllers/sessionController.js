const { response } = require("express");
const prisma = require("../prisma/prisma");

exports.startSession = async (req, res) => {
    try {
        const user_id  = req.body.user_id;
        const listenSession = await prisma.listenSession.create({
            data: {
                user_id: user_id
            }
        })
        const songs = [
            { song_id: '12345', song_album: 'Song Album', song_artist: 'Artist A' },
            { song_id: '67890', song_album: 'Song Album', song_artist: 'Artist B' },
            { song_id: '32345', song_album: 'Song Album Q', song_artist: 'Artist C' },
        ];
        for (const song of songs) {
        const existingSong = await prisma.song.findUnique({
            where: { 
                song_id: song.song_id 
            }
        });
        // dilihat apakah ada lagu di dalam database
        if (!existingSong){
            await prisma.song.create({
                data: {
                        song_id: song.song_id,
                        song_artist: song.song_artist,
                        song_album: song.song_album 
                    }    
                }); 
            } else {
                console.log(`Lagu dengan ID ${song.song_id} sudah ada di database.`);
            }
        }    

        //nambahin lagu ke db session
        const session = await prisma.session.createMany({
            data: songs.map(song => ({
                song_id: song.song_id,
                listen_id: listenSession.listen_id
            })),
        });
        
        // Untuk mengambil data lagu
        const songsData = await prisma.song.findMany({
            where: {
                song_id: {
                    in: songs.map(song => song.song_id)
                }
            }
        });
        res.status(200).json({ 
            "status": true,
            "message": "Song added to session",
            "data": {
                "listen_id": listenSession.listen_id,
                "session": session,
                "data songs": songsData 
            }
        })
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating session' });
        }    
}

