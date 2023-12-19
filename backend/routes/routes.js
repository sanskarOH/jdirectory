const express = require('express');
const Model = require('../model/model')
const router = express.Router();

module.exports = router;

router.post('/post',(req,res)=>{
    res.send("Poste API")
})

router.get('/getAll',(re1,res)=>{
    res.send('Get All API')
})

router.patch('/update/:id',(req , res)=>{
    res.send('Update by ID API')
})

router.delete('/delete/:id',(req, res)=>{
    res.send('Delete bby ID API')
})