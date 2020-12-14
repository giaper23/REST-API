const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const Validation = require('../validation');
const Authentication = require('../authentication');
const Authorization = require('../authorization');

// Find all users
router.get('/', Authentication.LoggedIn, Authorization.isAdmin, async (req, res) => {
    try{
        const users = await Users.find();
        res.json(users);
    }catch(err){
        res.json({ message: err });
    }
});

// Find a user
router.get('/:userId', Authentication.LoggedIn, Authorization.isAdmin, async (req, res) => {
    try{
    const user = await Users.findById(req.params.userId);
    res.json(user);
    }catch(err){
        res.json({message:err});
    }
});

// Make a new user
router.post('/', Authentication.LoggedIn, Authorization.isAdmin, Validation.UserCreate, async (req, res) => {
    const user = await Users.findOne({$or: [
        {username: req.body.username},
        {email: req.body.email}
    ]});
    if (user != null) {
        return res.status(400).send("User exists!");
    };
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: "user"
        });
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err){
        res.json(err);
    }
});

// Update user
router.patch('/:userId', Authentication.LoggedIn, Authorization.isAdmin, Validation.UserCreate, async (req, res) => {
    try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedUser = await Users.updateOne({_id: req.params.userId}, 
    { $set: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: "member"
    }});
    res.json(updatedUser);
    }catch(err){
        res.json({message: err});
    }
});

// Delete user
router.delete('/:userId', Authentication.LoggedIn, Authorization.isAdmin, async (req, res) => {
    try{
   const deletedUser = await Users.deleteOne({_id: req.params.userId})
   res.json(deletedUser);
    }catch(err){
        res.json({message: err});
    }
});

// Login user
router.post('/login', async (req, res) => {
        const user = await Users.findOne({username: req.body.username});
        if (user == null) {
            return res.status(400).send("Wrong username/password!");
        };
        try{
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                return res.status(400).send("Wrong username/password!");
            }
            // Make authorization Token
            const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
            res.header("auth-token", token).send(token);
    }catch(err){
        res.json(err);
    }
});

module.exports = router;