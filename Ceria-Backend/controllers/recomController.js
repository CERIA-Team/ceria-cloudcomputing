const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');

const BASE_URL = process.env.BASE_URL;

exports.recomSongs = async (req, res) => {
    const bpm = req.body.bpm;

    try {
        const response = await fetch(`${BASE_URL}/recommend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ HR: bpm })
        });

      

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error calling recommendation model:', error);
        res.status(500).json({ 
            // status: false,
            message: "Failed to recommend songs"
        });
    }
};


  // if (!response.ok) {
        //     // Just return the status code and a message
        //     return res.status(response.status).json({
        //         "status": false,
        //         "message": "Failed to recommend songs" // Or a more specific error message 
        //     });
        // }