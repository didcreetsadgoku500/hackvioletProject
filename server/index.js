const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser')


const UserModel = require("./models/Users")

const password = process.env.PASSWORD;

app.listen(3005, ()=>{console.log("running")})

mongoose.connect(`mongodb+srv://jared_w:${password}@emergency-contacts.67ictpk.mongodb.net/emergency-contacts?retryWrites=true&w=majority`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/getUser/:userId", async (req, res) => {
    const userId = req.params.userId;
    console.log("start");

    try {

        const user = await UserModel.findById(userId);
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
    console.log(req.body);
    const {name, phone} = req.body;

    try {
        const user = new UserModel({emergency_contact_name: name, emergency_contact_phone_number: phone});
        await user.save();
        res.json(user);
        res.cookie('userId', user._id, { maxAge: 900000, httpOnly: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});