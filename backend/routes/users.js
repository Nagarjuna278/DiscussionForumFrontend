const User = require('./../database/users/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = "nagarjuna"

router.post('/register',(req,res)=> {
    const today = new Date();
    const userdata = {
        username : req.body.username,
        forumposts : req.body.forumposts,
        gender : req.body.gender,
        section : req.body.section,
        dob : req.body.dob,
        password:req.body.password,
        UserEmail : req.body.UserEmail,
        class : req.body.class,
    }
    User.findOne({
        UserEmail : req.body.UserEmail
    })
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password,16,(err,hash)=> {
                userdata.password=hash
                User.create(userdata)
                .then(user => {
                    res.json({status: user.UserEmail + 'registered'})
                })
                .catch((error)=>{
                    res.send('error '+error)
                })
            })
        }
        else {
            res.json({error: 'user already exits'})
        }
    })
    .catch(error => {
        res.send('error :' + error)
    })
})

router.post('/login',(req,res)=>{
    User.findOne({
        UserEmail : req.body.UserEmail
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload = {
                    username: user.username,
                    _id:user._id,
                    UserEmail:user.UserEmail
                }
                let token = jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn : 18000
                })
                res.json({token : token})
            }else {
                res.json({error : "user details doesn't match"})
            }
        }else {
            res.json({error : "user doesn't exists"})
        }
    })
    .catch(error => res.send('error :' + error))
})
router.get('/profile',(req,res)=> {
    let decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)

    User.findOne({ _id : decoded._id })
        .then(user => {
            if(user){
                res.json(user)
            } else {
                res.json({error : 'user doesn\'t exists'})
            }
        })
        .catch(error => {
            res.send('error : '+ error)
        })
})

module.exports = router;