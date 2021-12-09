import Tour from './../models/tourModel.js'
import APIFeatures from './../utils/apiFeatures.js';
//FOR WHEN JSON FILE IS PRESENT, BUT NOT NEEDED
// const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'))

// ROUTE HANDLERS

const aliasTopTours = (req, res, next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next()
};


const getAllTours = async (req, res) => {
    try {
        //EXECUTE QUERY (NEEDED TO SEPERATE THIS SO THAT WE CAN USE MONGOOSE METHODS ON QUERY)
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        const tours = await features.query

        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            request: req.requestTime,
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}

const getTour = async (req, res) => {
    try {
        //SAME AS Tour.findOne({id: req.params.id})
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.send(404).json({
            status: 'Failed',
            message: err
        })
    }
}

const createTour = async (req, res) => {
    //CHECK FOR ERRORS FROM ASYNC AWAIT
    try {
        //REQ.BODY RETURNS POSTED DATA
        const newTour = await Tour.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                newTour
            }
        })
    }
    catch (err) {
        //400 = BAD REQUEST
        res.status(400).json({
            status: "Failed",
            message: `${err}`
        })
    }
}

const updateTour = async (req, res) => {
    try {
        //FIRST PARAM IS THE ID, SECOND IS THE UPDATED JSON SENT THROUGH REQ.BODY, THIRD IS OPTIONAL (RETURNS MODIFIED DOCUMENT AS OPPOSED TO ORIGINAL)
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Failed",
            message: `${err}`
        })
    }
}

const deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: "Failed",
            message: `${err}`
        })
    }
}

//AGGREGATION PIEPLINE FROM MONGO THAT MONGOOSE CAN USE
const getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    // _id: '$ratingsAverage',
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            },
            // {
            //     $match: { _id: { $ne: 'EASY' } }
            // }
        ])

        res.status(200).json({
            status: "success",
            data: {
                stats: stats
            }
        })

    } catch (err) {
        res.status(404).json({
            status: "Failed",
            message: `${err}`
        })
    }
}

const getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1 //2021
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: { 
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                     }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates'},
                    numTourStarts: { $sum: 1 },
                    tours: { $push: '$name'  }
                }
            },
            {
                $addFields: { 
                    month: '$_id'
                 }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numOfTourStarts: -1 }
            },
            {
                $limit: 12
            }
        ])

        res.status(200).json({
            status: "success",
            data: {
                plan
            }
        })

    } catch (err) {
        res.status(404).json({
            status: "Failed",
            message: `${err}`
        })
    }
}

export { getAllTours, getTour, createTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan }