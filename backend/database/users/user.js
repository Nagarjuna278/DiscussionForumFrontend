const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        trim:true,
        required: true
    },
    userId : {
        type: mongoose.Types.ObjectId,
    },
    forumposts : {
        posts: {
            type:String,
        },
    },
    gender: {
        type:String,
        required:true,
    },
    password : {
        type:String,
        required:true,
    },
    section: {
        type: String,
        required: true,
    },
    dob : {
        type: Date,
        required : true,
    },
    UserEmail : {
        type: String,
        required: true,
    },
    class : {
        type :Number,
        required: true,
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;