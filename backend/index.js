const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const songRoutes = require('./routes/songRoutes');
const fileUpload = require('express-fileupload')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// enable file upload
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

app.use('/', songRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
  })
  .catch(err => console.error(err));
