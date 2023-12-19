const mongoose=require('mongoose')

const dataSchema = new mongoose.Schema({
    name: {
        required:true,
        type: String
    },
    phonenumber: {
        required:true,
        type: Number
    },
    address: {
        required: true,
        type : String
    }
})

module.exports = mongoose.model('Data',dataSchema)