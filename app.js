const express = require("express");
const mongoose = require("mongoose");
const api = require("./controllers/api");
const app = express();

//setup a local db connection
const uri = "mongodb://localhost:27017/";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });


app.use(express.json());

app.use("/api", api);

app.listen(3000, () => {
    console.log("server is running")
})