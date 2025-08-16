const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const songRoutes = require('./routes/songRoutes');
const fileUpload = require('express-fileupload')
const compression = require("compression");
app.use(compression());

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// enable file upload
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=3600"); // cache 1 hour
  next();
});

// Optional: set timeout for all requests
app.use((req, res, next) => {
  req.setTimeout(5 * 60 * 1000); // 5 minutes
  next();
});

app.use('/', songRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
  })
  .catch(err => console.error(err));
