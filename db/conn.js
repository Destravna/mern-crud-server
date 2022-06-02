const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.db;

mongoose.connect(db, {
    useNewUrlParser : true
}).then(()=>console.log("Connection Start")).catch((error)=>{console.log(error.message)});