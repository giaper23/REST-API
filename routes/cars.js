const express = require('express');
const router = express.Router();
const Cars = require('../models/Cars');
const Validation = require('../validation');
const Authentication = require('../authentication');
const Authorization = require('../authorization');

// Find all cars
router.get('/', Authentication.LoggedIn, async (req, res) => {
    try{
        const cars = await Cars.find();
        res.json(cars);
    }catch(err){
        res.json({ message: err });
    }
});

// Find a car
router.get('/:carId', Authentication.LoggedIn, async (req, res) => {
    try{
    const car = await Cars.findById(req.params.carId);
    res.json(car);
    }catch(err){
        res.json({message:err});
    }
});

// Make a new car
router.post('/', Authentication.LoggedIn, Authorization.isAdmin, Validation.CarCreate, async (req, res) => {
    const car = new Cars({
        brand: req.body.brand,
        model: req.body.model,
        engine: req.body.engine,
        manual: req.body.manual,
        plates: req.body.plates,
        category: req.body.category,
        price: req.body.price,
        status: req.body.status
    });
    try{
    const savedCar = await car.save();
    res.json(savedCar);
    }catch(err){
        res.json(err);
    }
});

// Update a car
router.patch('/:carId', Authentication.LoggedIn, Authorization.isAdmin, Validation.CarCreate, async (req, res) => {
    try{
   const updatedCar = await Cars.updateOne({_id: req.params.carId}, 
    { $set: {
        brand: req.body.brand,
        model: req.body.model,
        engine: req.body.engine,
        manual: req.body.manual,
        plates: req.body.plates,
        category: req.body.category,
        price: req.body.price,
        status: req.body.status
    }});
    res.json(updatedCar);
    }catch(err){
        res.json({message: err});
    }
});

// Delete a car
router.delete('/:carId', Authentication.LoggedIn, Authorization.isAdmin, async (req, res) => {
    try{
   const deletedCar = await Cars.deleteOne({_id: req.params.carId})
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;