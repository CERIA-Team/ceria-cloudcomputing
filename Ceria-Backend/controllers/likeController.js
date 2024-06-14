const { response } = require("express");
const prisma = require("../prisma/prisma");

exports.likeSong = async (req, res) => {
    const userId = req.body.user_id
    const songId = req.body.song_id
     // ngecek ada like atau tidak
    const checkLike = await prisma.likedSong.count({
        where: {
            user_id: userId,
            song_id: songId
        }
    })
    if (checkLike === 1){
        // Jika like sudah ada, hapus like
        await prisma.likedSong.delete({
            where: {
                user_id_song_id: {
                    user_id: userId,
                    song_id: songId
                }
            }
        })
        // Kurangi jumlah like di tabel song
        await prisma.song.update({
            where: {
                song_id: songId 
            },
            data: {
                like: {
                    decrement: 1
              }
            }
          });
          return res.status(200).json({
            "status": true,
            "message": "Like removed successfully",
          });
    } else {
        // jika like belum ada, tambah like baru
    try {
        await prisma.likedSong.create({
            data: {
                user_id: userId,
                song_id: songId
            }
        })
        // ubah di database
        await prisma.song.update({
            where: {
                song_id: songId 
            },
            data: {
                like: {
                    increment: 1
                }
            }
        })
        res.status(200).json({
            "status": true,
            "message": "Song liked successfully",
        })
    } catch (error)  {
        console.error(error);
        res.status(500).json({
            "status": false,
            "message": "An unexpected error occurred on the server",
        })
    }} 
}

// ini buat ngelihat apa aj yang udah dilike sama user
exports. getLikesByUser = async (req,res) => {
    const userId = req.params.user_id
    
    try {
        const likes = await prisma.likedSong.findMany({
            where: {
                user_id: userId
            },
            include : {
                song: true
            }
        });
        res.status(200).json({
            "status": true,
            "message": "Likes retrieved successfully",
            "data": likes,
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            "message": "Error retrieving likes"
        });
    }
}