const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: false
    },
    position: {
        type: String,
        required: true,
        lowercase: true,
    },
    checkInTimes: {
        type: [String],
        default: []
    }, // Array to store multiple timestamps
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const workerModel = mongoose.model("WorkerSchema", workerSchema);

//saves the model to MONGODB when the server initializes
const doc = new workerModel({
    fullname: "john doe",
    position: "manager"
});
doc.save();

//export for use in other components
module.exports = workerModel;


