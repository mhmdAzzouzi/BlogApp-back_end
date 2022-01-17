require("dotenv").config();
const express = require("express")
const {sequelize}  = require('./models');
const cors = require("cors")

const { User, Channel, Video } = require('./models');

//require('./connection')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/channel', async (req, res, next) => {
    try {
      const channels = await Channel.findAll();
      console.log(channels);
      res.json(channels);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
})

app.get('/video', async (req, res, next) => {
    try {
      const videos = await Video.findAll();
      console.log(videos);
      res.json(videos);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
})

app.get('/user', async (req, res, next) => {
    try {
      const users = await User.findAll();
      console.log(users);
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
})

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  try {
    await sequelize.sync();
    console.log('connected to database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`server is up and listening on port ${port}`);
});
