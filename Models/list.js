const mongooes = require('mongoose')

const ListSchema = new mongooes.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    user:[
        {
            type:mongooes.Types.ObjectId,
            ref:"User"
        }
    ]
    
},{timestamps:true})

module.exports = mongooes.model("List",ListSchema)