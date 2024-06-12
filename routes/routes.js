const express = require('express');
const router = express.Router()
const auth = require("../middleware/auth");

// Welcome route
router.get("/", (req, res) => {
    res.status(200).json({
        "message": "success"
    })
});

//controllers
const userController = require('../controllers/userController');
const sessionController = require ('../controllers/sessionController');
const likeController = require ('../controllers/likeController');
const modelController = require ('../controllers/modelController');

// User
router.post('/user', userController.getUserData);
router.get('/user/:userId', auth, userController.getProfile)

//Session
router.post('/listenSession/:listenId', auth, sessionController.getlistenSessionById)
router.get('/listenSessions', auth, sessionController.getAllListenSession )
router.get('/listenSession/:userId', auth,  sessionController.getlistenSessionByUser)

// Like songs
router.post('/like/', auth, likeController.likeSong)
router.get('/likes/:userId', auth, likeController.getLikesByUser)


// recommemd
router.post('/recommend',  modelController.recommendSong)


module.exports = router