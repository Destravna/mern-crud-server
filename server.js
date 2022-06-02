const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("./db/conn.js");
require("dotenv").config();

app.use(bodyParser.urlencoded({extended: true}));
const port = 8003 || process.env.PORT;
const users = require("./model/userSchema");
const router = require("./routes/router");


const cors = require("cors");
app.use(express.json());
app.use(cors());


app.use(router);

app.listen(process.env.PORT, ()=>{
    console.log("Started server at port " + port);
})