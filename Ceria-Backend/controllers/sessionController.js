const { response } = require("express");
const prisma = require("../prisma/prisma");
const recomSongController = require("../controllers/recomController");

exports.startSession = async (req, res) => {
  const userId = req.user.payload;
  try {
    const listenSession = await prisma.listenSession.create({
      data: {
        user_id: userId,
      },
    });

    res.status(200).json({
      status: true,
      message: "Song added to session",
      data: {
        listenSession,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating session" });
  }
};

exports.getlistenSessionByUser = async (req, res) => {
  const userId = req.user.payload;
  const sessions = await prisma.listenSession.findMany({
    where: {
      user_id: userId,
    },
    select: {
      listen_id: true,
      _count: {
        select: {
        Session: true,
        }
      }
    },
  });
  if (!sessions) {
    return res.status(404).json({
      status: false,
      message: "Listen session not found",
    });
  }
  res.status(200).json({
    status: true,
    message: "Listen session retrieved successfully",
    data: sessions,
  });
};
exports.getSongsInSession = async (req, res) => {
  const listenId = req.params.listen_id;
  try {
    const sessions = await prisma.session.findMany({
      where: {
        listen_id: listenId,
      },
    });

    res.status(200).json({
      status: true,
      message: "Song added to session",
      data: {
        sessions,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};
