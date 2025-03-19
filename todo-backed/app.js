const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const companyRoute = require("./src/Company/route");
const reviewRoute = require("./src/Review/route");


require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3004;
app.set('json spaces', 5);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
    ],
  })
);

app.get('/', (req, res) => {
  res.send(process.env.FRONT_END_URL);
});

const mongoURL = process.env.MONOGO_URL;

mongoose.connect(mongoURL)
  .then(() => {
    app.use("/api/v1/company", companyRoute);
    app.use("/api/v1/review", reviewRoute);


    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
