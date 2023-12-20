const express = require('express');
const Model = require('../model/model'); 
const router = express.Router();

module.exports = router;

router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        address: req.body.address
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data);
    }
    catch(error)
    {
        res.status(500).json({message: error.message})

    }
   
});

router.patch('/update/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new : true};

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result) 
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
});

router.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Model.findByIdAndDelete(id)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
});
router.get('/search',async (req,res)=>{
    try{
        const {name , phonenumber,address} = req.query;

        const query = {};
        if(name){
            query.name = new RegExp(name,'i')
        }

        if(phonenumber){
            query.phonenumber = phonenumber;
        }

        if(address){
            query.address = new RegExp(address,'i')
        }

        const searchResults = await Model.find(query);
        res.json(searchResults)
    }
    catch(error){
        res.status(400).json({message : error.message})
    }

    
})