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
            body: JSON.stringify({ 
                HR: bpm })
        });

        const contentType = response.headers.get('content-type');

        if (!response.ok) {
            const error = await response.text();
            console.error('Error from recommendation service:', error);
            res.status(500).json({ message: 'Error fetching recommendations' });
            return;
        }

        const data = await response.text();
        console.log(data); 

        try {
          const parsedData = JSON.parse(data); 
          res.json(parsedData); 
        } catch (error) {
          console.error('Error parsing JSON:', error);
          res.status(500).json({ message: 'Error parsing recommendations' });
        }

    } catch (error) {
        console.error('Error calling recommendation model:', error);
        res.status(500).json({ 
            status: false,
            message: "Failed to recommend songs"
        });
    }
};