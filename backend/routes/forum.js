const express = require('express');
const router = express.Router();

const Post = require('../database/models/Post');
const Reply = require('./../database/models/Reply');

/*router.post('/',(req,res)=>{
    (new Post(req.body))
        .save()
        .then(data=> res.json(data))
        .catch(error=> console.log(error))
})*/

router.post('/post',(req,res)=>{
    if(req.body.isPost){
        new Post(req.body)
        .save()
        .then(data=>res.json(data))
        .catch(error=>console.log(error))
    }else{
   (new Post(req.body))
        .save()
        .then(data=>{
            console.log(data.postId)
            Post.findOne({ _id:data.postId })
            .then(postdata => {
                if(postdata){
                postdata.replies.push(data._id)
                postdata.save()
                console.log(postdata.replies)
                }
                else {
                    res.json(postdata)
                }
            })
            .catch(erroe => console.log(error))
            Post.findOne({_id:data.prevId})
            .then(postdata => {
                if(postdata){
                postdata.replies.push(data._id)
                postdata.save()
                console.log(postdata.replies)
                }
                else {
                    res.json(postdata)
                }
            })
            .catch(erroe => console.log(error))
            //Post.update({ _id:data.postId},{"$push" : { replies :  data._id } } )
            console.log(data)
            res.json(data)
        })
        .catch(error=>console.log(error))
    }
})
/*
router.post('/reply2',(req,res)=>{
    (new Reply(req.body))
        .save()
        .then(data=>{
            console.log(data.postId)
            Reply.findOne({ _id:data.prevId })
            .then(postdata => {
                postdata.replies.push(data._id)
                postdata.save()
                console.log(postdata.replies)
            })
            .catch(erroe => console.log(error))
            //Post.update({ _id:data.postId},{"$push" : { replies :  data._id } } )
            console.log(data)
            res.json(data)
        })
        .catch(error=>console.log(error))
})*/

router.get('/post',(req,res)=>{
    Post.find({isPost:true})
    .then(posts => res.json(posts))
    .catch(error=>console.log(error))
});
router.get('/post/:Id',(req,res)=>{
    console.log("jello")
    
    let postresponse = [];

    Post.find({ _id:req.params.Id})
    .then(reply=>{ 
        postresponse.push(reply)
        Post.find({postId:req.params.Id})
        .then(data=>{
            console.log(data.length)
            if(data.length == 0){
                res.json(postresponse[0])
            }else{
            postresponse.push(data);
            res.json(postresponse[0,1])}
        })
        .catch(error=>console.log(error))
    })
    .catch(error=> console.log(error))
})

module.exports = router;