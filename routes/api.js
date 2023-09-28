const express = require('express');
const router = express.Router();
const {MongoClient} = require('mongodb');
//const User = require('../models/user');
//const bdd = require('../config/db');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'USMBRO';

const client = new MongoClient(url);

module.exports = router;


//Création d'un utilisateur
router.post('/users', async (req, res) => {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        const newUser = {nom: req.body.nom, prenom: req.body.prenom, filiere: req.body.filiere};
        const result = await collection.insertOne(newUser);
        console.log('New user created with the following id:', result);
        //const user = new User(req.body);
        //await user.save();
        res.status(201).json(user);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//Lecture de tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        await client.connect()
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        const result = await collection.find().toArray();
        console.log('Found the following records:');
        console.log(result);        
        res.status(200).json(users);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// //Lecture d'un utilisateur
// router.get('/users/:id',async(req,res)=>{
//     try{
//         const user = await User.findById(req.params.id);
//         res.status(200).json(user);
//     }catch(err){
//         res.status(400).json({message:err.message});
//     }
// });

// //Modification d'un utilisateur
// router.put('/users/:id',async(req,res)=>{
//     try{
//         const user = await User.findByIdAndUpdate(req.params.id,req.body);
//         res.json(user);
//     }catch(err){
//         res.status(400).json({message:err.message});
//     }
// });

// //Suppression d'un utilisateur
// router.delete('/users/:id',async(req,res)=>{
//     try{
//         const user = await User.findByIdAndDelete(req.params.id);
//         res.json(user);
//     }catch(err){
//         res.status(400).json({message:err.message});
//     }
// });