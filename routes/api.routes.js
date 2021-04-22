const express = require('express')
const router = express.Router()

const Place = require('./../models/place.model')

// http://localhost:3000/api/restaurants
router.get('/places', (req, res) => {

  Place
    .find()
    .then(places => res.json(places))
    .catch(err => console.log('soy un error DE SERVIDOR y salgo por la terminal!', err))
})


module.exports = router