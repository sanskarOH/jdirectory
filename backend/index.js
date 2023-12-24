const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors')
const app = express();
app.use(express.json());

app.use(cors());
require('dotenv').config();
const mongoS = process.env.DATABASE_URL

mongoose.connect(mongoS)
const database = mongoose.connection

app.use('/api',routes)



database.on('error',(error)=>{
    console.log(error);
})
database.once('connected',()=>{
    console.log("Database Connected Successfully");
})

app.listen(3000,()=>{
    console.log(`Api started ${3000}`)
});
