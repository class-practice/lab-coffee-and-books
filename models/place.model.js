const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema({
  name:  {
    type: String,
    required: true,
    default: 'Nombre vacio',
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  description: {
    type: String,
    enum: ['coffee shop', 'bookstore'],
    required: true,
    minlength: 10,
    maxlength: 200,
    trim: true
  },
  location: {                 // new!
    type: {
      type: String,
      required: true
    },
    coordinates: [Number],
  }
},
  {
    timestamps: true
  })

placeSchema.index({ location: '2dsphere' })        // new!

const Place = mongoose.model('Place', placeSchema)

module.exports = Place