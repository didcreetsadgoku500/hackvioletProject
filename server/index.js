const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.listen(3005, ()=>{console.log("running")})
//TODO environment password
mongoose.connect('mongodb+srv://jared_w:<password>@emergency-contacts.67ictpk.mongodb.net/emergency-contacts?retryWrites=true&w=majority');
const express = require('express');
const app = express();







// get emergency contact
app.get("/....", async (req, res) => {

});

// Initial Registration
    // send req=contact_info -> res=token
app.post("/createUser", async (req,res) => {


});