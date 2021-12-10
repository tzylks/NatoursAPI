import mongoose from 'mongoose'
import slugify from 'slugify'

//CREATE THE SHAPE OF OUR DATA, INCLUDING VALIDATORS
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size!']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        //REMOVE ALL WHITESPACE FROM BEGINNING AND END OF STRING
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have an image']
    },
    images: [String],
    slug: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    },
}, {
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
})

//FOR ITEMS YOU DO NOT WANT TO COMMIT TO DB
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7
})

//DOCUMENT MIDDLEWARE
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})

// tourSchema.pre('save', function(next) {
//     console.log('Will save document...')
//     next();
// })

// tourSchema.post('save', function(doc, next) {
//     console.log(doc)
//     next()
// })

//QUERY MIDDLEWARE (FOR ALL STRINGS THAT START WITH FIND SUCH AS FINDONE FINDONEANDDELETE ETC.)
tourSchema.pre(/^find/, function(next) {
    this.find({ secretTour: { $ne: true } })
    next()
})

//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift(({$match: {secretTour: {$ne: true}}}))
    next()
})
//CAPITL LETTERS FOR MODEL
const Tour = mongoose.model('Tour', tourSchema)

export default Tour
