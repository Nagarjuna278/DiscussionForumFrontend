const express = require('express');
const app=express();
const mongoose = require('./database/mongoose');
const crypto = require('crypto');
const cors= require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());

const NewUser = require('./routes/users');
const forum = require('./routes/forum');

app.use(cors());
app.use('/api/',NewUser)
app.use('/forum',forum)

/*
app.get('/api/lists',(req,res)=> {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error)=> console.log(error));
});

app.post('/api/lists',(req,res)=>{
    (new List(req.body))
        .save()
        .then((list)=> res.send(list))
        .catch((error)=> console.log(error));
});

app.get('/api/lists/:listId',(req,res)=>{
    List.find({_id : req.params.listId})
    .then(lists => res.send(lists))
    .catch((error)=> console.log(error));
})
*/
app.listen(3000, ()=> console.log('Server Running in port 3000'))