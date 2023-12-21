// import express
const express = require("express");
const cookieParser=require('cookie-parser')
const app = express();
var cors = require('cors')
// redirect to router
const userRouter = require("./router/router");
var morgan = require('morgan')


app.use(morgan('combined'))
 
app.use(
  cors({
    origin: "*",
    // methods: ["GET","POST"]
  })
);

// database connection
const mongoose = require("mongoose");
const data = "mongodb://localhost:27017/task";
mongoose
  .connect(data)
  .then(() => {
    console.log("connect successfully");
  })
  .catch((error) => {
    console.log("connection failed ", error);
  });

// for json response

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res, next) => {
  res.json({ status: 200, message: "hello from server" })
})
// URLs for the router
app.use("/user", userRouter);

// port configuration with env
const port = process.env.PORT;
app.listen(port, function () {
  console.log("localhost:" +`http://localhost:${port}`);
});