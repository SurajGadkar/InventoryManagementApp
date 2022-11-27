const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Imports
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes Middleware
app.use("/api/v1/users", userRoute);

//Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

//Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//connect to mongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
