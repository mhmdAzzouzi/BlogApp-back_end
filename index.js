require("dotenv").config();
const express = require("express");
const { sequelize }  = require('./models');
const cors = require("cors");

const indexRouter = require('./routes/index');

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', indexRouter);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`server is up and listening on port ${port}`);
});
