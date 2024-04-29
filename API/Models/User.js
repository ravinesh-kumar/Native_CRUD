const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name"],

    },
    email: {
        type: String,
        required: [true, "Please provide the name"],

    },
    phone: {
        type: String,
        required: [true, "Please provide the name"],

    },
    message: {
        type: String,
        required: [true, "Please provide the name"],

    },
    pic1: {
        type: String,
        default: ""

    },

})

const User = new mongoose.model("User", UserSchema)  //file name , schema name
module.exports = User  //file name