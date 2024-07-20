const mongooes = require('mongoose')

const userSchema = new mongooes.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    list:[
        {
            type:mongooes.Types.ObjectId,
            ref:"List"
        }
    ]
})

module.exports = mongooes.model("User",userSchema)