const { Router } = require("express");
const mongoose = require("mongoose");
const dbmodel = require("../dbmodel/schema")

const app = Router();

app.post("/registerWorker", async (req, res) => {
    let { fullname, position } = req.body;
    console.log("Received data:", fullname, position);

    try {
        //save user to the database
        const worker = await dbmodel.create({ fullname, position });
        res.status(200);
        console.log(worker._id)
        return res.json({ worker: worker._id.toString() });
    } catch (error) {
        //log out error
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})


app.post("/checkin/:_id", async (req, res) => {

    const dayOfCheckin = new Date().toISOString().split('T')[0];
    const { _id } = req.params;
    console.log(`date : ${dayOfCheckin}`);

    try {
        const worker = await dbmodel.findById(_id);

        if (!worker) {
            console.log("worker does not exist")
            return res.status(404).json({ error: "worker does not exist" });
        }

        if (!worker.checkInTimes) {
            console.log("checkInTimes is undefined, initializing it...");
        }


        if (worker) {
            if (worker.checkInTimes.includes(dayOfCheckin)) {
                return res.status(400).json({ error: " Checkin already exists" })
            }

            else {
                worker.checkInTimes.push(dayOfCheckin);
                await worker.save();
                console.log("checkin recorded");
                return res.status(200).json({ message: "checkIn recorded for the day" })
            }

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
})





module.exports = app;