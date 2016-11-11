var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema ({
    email:  {
        type:String,
        unique:true,
        required: true
    },
    encryptedPass: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    admin: {
        type: [String],
        default: []
    },
    events: {
        type: [String],
        default: []
    },
    groups: {
        type: [String],
        default: []
    captain: {
        type: [String],
        default: []
    },
    phone: Number
})
