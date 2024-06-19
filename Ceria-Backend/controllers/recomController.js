const dotenv = require("dotenv");
const prisma = require("../prisma/prisma");
dotenv.config();
// const fetch = require("node-fetch");

const BASE_URL = process.env.BASE_URL;

exports.recomSongs = async (req, res) => {
  const bpm = req.body.bpm;
  const listenId = req.body.listen_id;

  try {
    const listenSession = await prisma.listenSession.findUnique({
      where: {
        listen_id: listenId,
      },
    });
    if (!listenSession) {
      return res.status(404).send({ message: "Listening session not found" });
    }
    if (listenSession.user_id != req.user.payload) {
      return res.status(403).send({ message: "Unauthorized" });
    }
    const response = await fetch(`${BASE_URL}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        HR: bpm,
      }),
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const error = await response.text();
      console.error("Error from recommendation service:", error);
      res.status(500).json({ message: "Error fetching recommendations" });
      return;
    }

    const data = await response.text();
    console.log(data);

    try {
      const parsedData = JSON.parse(data);
      for (const songId of parsedData) {
        const existingSong = await prisma.song.findUnique({
          where: {
            song_id: songId,
          },
        });
        if (!existingSong) {
          await prisma.song.create({
            data: {
              song_id: songId,
            },
          });
        } else {
          console.log(`Lagu dengan ID ${existingSong.song_i} sudah ada di database.`);
        }
      }
      await prisma.session.createMany({
        data: parsedData.map((songId) => ({
          song_id: songId,
          listen_id: listenSession.listen_id,
        })),
      });
      res.status(200).json(parsedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).json({ message: "Error parsing recommendations" });
    }
  } catch (error) {
    console.error("Error calling recommendation model:", error);
    res.status(500).json({
      status: false,
      message: "Failed to recommend songs",
    });
  }
};
