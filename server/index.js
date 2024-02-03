const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const UserModel = require("./models/Users")

const password = process.env.PASSWORD;

app.listen(3005, ()=>{console.log("running")})
//TODO environment password

mongoose.connect(`mongodb+srv://jared_w:${password}@emergency-contacts.67ictpk.mongodb.net/emergency-contacts?retryWrites=true&w=majority`);




app.get("/getUser/:userId", async (req, res) => {
    const userId = req.params.userId;
    console.log("start");

    try {

        const user = await UserModel.findById(userId);
        console.log(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log("user");
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post("/createUser", async (req,res) => {
    const {name, phone} = req.body;

    try {
        const user = new UserModel({emergency_contact_name: name, emergency_contact_phone_number: phone});
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});