const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser')
var cookieParser = require("cookie-parser")
const cors = require("cors")
const UserModel = require("./models/Users")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(cors({credentials: true, origin: true}))

var userLocationMap = new Map();

const password = process.env.PASSWORD;

app.listen(3005, ()=>{
    console.log("running");
})

mongoose.connect(`mongodb+srv://jared_w:${password}@emergency-contacts.67ictpk.mongodb.net/emergency-contacts?retryWrites=true&w=majority`);

const nodemailer = require('nodemailer');
const SENDER_EMAIL = "distressos.messenger@gmail.com";
const SENDER_PASSWORD = process.env.SENDER_PASSWORD
const BASE_URL = process.env.BASE_URL
const SERV_PROV = process.env.SERV_PROV

const send_alert_to = (send_to_address, client_name, contact_name, client_id) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SENDER_EMAIL,
          pass: SENDER_PASSWORD,
        },
      });

    const mailOptions = {
        from: SENDER_EMAIL,
        to: send_to_address,
        subject: `${client_name} SOS ALERT`,
        text: `${contact_name}, this message is alerting you that ${client_name} is feeling in an unsafe place, and has requested your help.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


    // setTimeout(10)



    const transporter_link = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SENDER_EMAIL,
          pass: SENDER_PASSWORD,
        },
      });

    const mailOptions_link = {
        from: SENDER_EMAIL,
        to: send_to_address,
        subject: `${client_name} SOS ALERT`,
        text: `Please follow this link to view their live location: ${BASE_URL}/${client_id}`,
    };

    transporter_link.sendMail(mailOptions_link, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      
}

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

app.get("/alertContact", async (req,res) => {
    console.log(req.cookies.userId);

    const user = await UserModel.findById(req.cookies.userId);

    // const send_to =  (req.cookies);

    console.log(user);


    const client_name = user.client_name;
    const client_id = req.cookies.userId;
    const contact_name = user.emergency_contact_name;
    const contact_number = user.emergency_contact_phone_number;

    const send_to_address = `${contact_number}${SERV_PROV}`;

    console.log(send_to_address);

    send_alert_to(send_to_address, client_name, contact_name, client_id)

    res.status(200).json()
});


// post geolocation
app.post("/postGeolocation", async (req,res) => {
    // console.log(req.cookies.userId);
    console.log(req.body);
    try {
        userLocationMap.set(req.cookies.userId, req.body)

        // console.log(userLocationMap);
        // console.log(userLocationMap.get(req.cookies.userId));
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



