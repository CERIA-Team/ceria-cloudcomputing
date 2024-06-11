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

// User
router.post('/user', userController.getUserData);
router.get('/user/:userId', auth, userController.getProfile)

//Session
router.post('/listenSession/:listenId', sessionController.getlistenSessionById)
router.get('/listenSessions', sessionController.getAllListenSession )
router.get('/listenSession/:userId', sessionController.getlistenSessionByUser)

// Like songs
router.post('/like/', likeController.likeSong)
router.get('/likes/:userId', likeController.getLikesByUser)


module.exports = router