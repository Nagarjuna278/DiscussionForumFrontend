const mongoose = require('mongoose');


const RepliesSchema = new mongoose.Schema({
    query : { title: {
        type: String,
        trim : true
    },
    content: {
        type: String,
        trim: true,
        required: true,
    }
    },   
    userId: {
        type:String,
        trim:true,
        required: true,
    },
    postId:{
        type:String,
        trim:true,
        required:true,
    },
    replies : [
        {
        type: String,
        trim:true,
        }
    ],
});

module.exports = mongoose.model('Reply',RepliesSchema);