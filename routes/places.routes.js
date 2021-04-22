const express = require('express')
const { findById } = require('./../models/place.model')
const router = express.Router()

const Place = require('./../models/place.model')

// Endpoints
router.get('/', (req, res) => {
  
  Place
    .find()
    .then(allPlaces => res.render('pages/places/list', { allPlaces }))
    .catch(err => console.log(err))
})

// CREATE PLACE
router.get('/create', (req, res) => res.render('pages/places/create'))

router.post('/create', (req, res) => {

    const { name, description, latitude, longitude } = req.body

    const location = {
      type: 'Point',
      coordinates: [latitude, longitude]
    }

    Place
      .create({ name, description, location })
      .then(() => res.redirect('/places'))
      .catch(err => console.log(err))
})

// PLACE DETAILS
router.get('/details', (req, res) => {

  const { place_id } = req.query

  Place
    .findById(place_id)
    .then(place => {
      res.render('pages/places/details', place)
      console.log(place)
    })
    .catch(err => console.log('Error', err))
})

// EDIT PLACE
router.get('/edit', (req, res) => {

  const { place_id } = req.query
  
  Place
    .findById(place_id)
    .then(place => {
      res.render('pages/places/edit', place)
      console.log(place)
    })
    .catch(err => console.log('Error', err))
})

// EDIT PLACE
router.post('/edit', (req, res) => {

  const { place_id } = req.query
  const { name, description, latitude, longitude } = req.body

  Place
    .findByIdAndUpdate(place_id, { name, description, latitude, longitude })
    .then(editedPlace => res.redirect(`/places`))
    .catch(err => console.log('Error!', err))
})

// DELETE PLACE

router.post('/delete', (req,res) => {

  const { place_id } = req.query

  Place
    .findByIdAndDelete(place_id)
    .then(() => res.redirect('/places'))
    .catch(err => console.log('Error', err))

})



module.exports = router