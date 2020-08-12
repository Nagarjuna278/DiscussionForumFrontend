const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   query : { title: {
        type: String,
        trim : true
    },
    content: {
        type: String,
        trim: true,
        required :true,
    },
    },   
    replies : [
        {
        type: Object,
        trim:true,
        }
    ],
    isPost : {
        type:Boolean,
        default:true,
    },
    userId: {
        type:String,
        trim:true,
        required: true,
    },
    prevId: {
        type:String,
        trim:true,
    },
    postId : {
        type:String,
        trim:true,
    }
});

module.exports = mongoose.model('Post',PostSchema);