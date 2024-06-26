const axios = require('axios');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

const createToken = (payload) => {
  return jwt.sign({ payload }, process.env.ACCESS_SECRET_KEY, {
      expiresIn: 30 * 24 * 60 * 60
  })
}

exports.getUserData = async (req, res) => {
  const accessToken = req.body.accessToken; // Mengambil token akses dari req.user
  try {
    const response = await spotifyApi.get('/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log (response.data)
    const {display_name, id, email} = response.data
    
    const checkUser = await prisma.user.findUnique({
      where: {
        user_id: id
      }, 
    })
    if (!checkUser){
      console.log("belum ada user")
      const newUser = await prisma.user.create({
        data:{
          user_display_name: display_name,
          user_id: id,
          user_email: email
        }
      })
      const token = createToken(newUser); 
      res.status(200).json({
        "status": true,
        "message": "Account created successfully",
        "data": newUser,
        "token": token,
      });
    }else {
      const token = createToken(checkUser.user_id); 
      res.status(200).json({
        "status": true,
        "message": "Already ada",
        "data": checkUser,
        "token": token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
  
};

exports.getProfile = async (req, res) => {
  const userId = req.params.userId; 

  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId, 
      },
      select: {
        user_display_name: true, 
        user_email: true,      
      },
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User profile retrieved successfully",
      data: user, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "An unexpected error occurred on the server",
    });
  }
};






