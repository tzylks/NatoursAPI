import mongoose from 'mongoose'

//CREATE THE SHAPE OF OUR DATA, INCLUDING VALIDATORS
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
})

//CAPITL LETTERS FOR MODEL
const Tour = mongoose.model('Tour', tourSchema)

export default Tour
