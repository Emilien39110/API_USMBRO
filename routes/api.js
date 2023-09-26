const express = require('express');
const router = express.Router();
const User = require('../models/user');
//const db = require('../config/db');


//Création d'un utilisateur
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Lecture de tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Lecture d'un utilisateur
router.get('/users/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

//Modification d'un utilisateur
router.put('/users/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body);
        res.json(user);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

//Suppression d'un utilisateur
router.delete('/users/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});