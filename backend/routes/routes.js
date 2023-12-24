const express = require('express');
const Model = require('../model/model'); 
const router = express.Router();

module.exports = router;

router.post('/add', async (req, res) => {
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

router.post('/get/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Model.findById(id);
        res.json(id);
    }
    catch(error){
        res.status(500)
    }
})

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

router.delete('/delete/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const result = await Model.findByIdAndDelete(id)

        res.send(result)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
});
