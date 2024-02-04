const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser')
var cookieParser = require("cookie-parser")



var userLocationMap = new Map();

const UserModel = require("./models/Users")

const password = process.env.PASSWORD;

app.listen(3005, ()=>{console.log("running")})

mongoose.connect(`mongodb+srv://jared_w:${password}@emergency-contacts.67ictpk.mongodb.net/emergency-contacts?retryWrites=true&w=majority`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

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
    const {client_name,contact_name, phone} = req.body;
    try {
        const user = new UserModel({client_name: client_name,emergency_contact_name: contact_name, emergency_contact_phone_number: phone});
        await user.save();
        // res.json(user);
        res.cookie('userId', user._id, { maxAge: 90000000000, httpOnly: true, path: '/' });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// post geolocation
app.post("/postGeolocation", async (req,res) => {
    // console.log(req.cookies.userId);
    console.log(req.body);



    try {

        userLocationMap.set(req.cookies.userId, req.body)

        // console.log(userLocationMap);
        console.log(userLocationMap.get(req.cookies.userId));
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get("/getLocation/:distressed_id", async (req, res) => {
    try {
        const userId = req.params.distressed_id;
        res.status(200).json(userLocationMap.get((userId)));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



