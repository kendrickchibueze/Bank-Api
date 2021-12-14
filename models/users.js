const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id : Schema.Types.ObjectId,

    firstName:{
        type:String,
        required:true

    },
    lastName:{
        type:String,
        required:true

    },
    profileImage:{
        type:String,
        required:true

      },
    email :{
        type: String,
         required:true,
         unique:true,
         match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
     },
    password: {
        type: String,
        required: true
    },

    role:{
        type: String,
        enum:["regular", "admin"],
        default: "regular"

    }

})

module.exports = mongoose.model('Users', userSchema)