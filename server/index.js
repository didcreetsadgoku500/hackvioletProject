const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.listen(3005, ()=>{console.log("running")})
//TODO environment password
app.connect('mongodb+srv://jared_w:<password>@emergency-contacts.67ictpk.mongodb.net/emergency-contacts?retryWrites=true&w=majority')
