const express = require('express');
const router = express.Router();
const {MongoClient} = require('mongodb');
//const User = require('../models/user');
//const bdd = require('../config/db');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'USMBRO';

const client = new MongoClient(url);

module.exports = router;

//EVENTUELLEMENT VIRER L'ID DES ROUTES GET S'IL NE SERT A RIEN

//Création d'un utilisateur
router.post('/users/', async (req, res) => {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        let db = client.db(dbName);
        let collection = await db.collection('users');
        //console.log(req.url.nom, req.query.prenom, req.body.filiere);
        //console.log(req.body);
        let newUser = req.body;
        const result = await collection.insertOne(newUser);
        console.log('New user created with the following id:', result);
        //const user = new User(req.body);
        //await user.save();
        res.status(201).json(result);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
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
        res.status(200).json(result);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
    }
});

//Lecture d'un utilisateur
router.get('/user/prenom/:prenom', async (req, res) => {
    try {
        await client.connect()
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        const result = await collection.find({prenom: req.params.prenom}).toArray();
        console.log('Found the following records:');
        console.log(result);
        res.status(200).json(result);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
    }
});

router.get('/user/nom/:nom', async (req, res) => {
    try {
        await client.connect()
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        const result = await collection.find({nom: req.params.nom}).toArray();
        console.log('Found the following records:');
        console.log(result);
        res.status(200).json(result);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
    }
});

router.get('/user/filiere/:filiere', async (req, res) => {
    try {
        await client.connect()
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        const result = await collection.find({filiere: req.params.filiere}).toArray();
        console.log('Found the following records:');
        console.log(result);
        res.status(200).json(result);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }finally{
        client.close();
    }
});

//Modification d'un utilisateur
// router.put('/users/delete/:prenom',async(req,res)=>{
//     try{
//         await client.connect()
//         const db = client.db(dbName);
//         const collection = db.collection('users');
//         const result = await collection.findByIdAndUpdate(req.params.prenom,req.body);
//         res.json(result);
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