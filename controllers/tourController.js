import Tour from './../models/tourModel.js'

//FOR WHEN JSON FILE IS PRESENT, BUT NOT NEEDED
// const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'))

// ROUTE HANDLERS
const getAllTours = async (req, res) => {
    try {
        
        //BUILD QUERY
        console.log(req.query)
        const queryObject = {...req.query}
        //REMOVE THESE ELEMENTS FROM THE QUERYOBJECT
        const exludedFields = ['page', 'sort', 'limit', 'fields']
        exludedFields.forEach(el => delete queryObject[el])
        console.log(queryObject)

        //USING THE PARAMS e.g.(/api/v1/tours?difficulty=easy&duration=5) REQ.QUERY RETURNS OBJECT {duration: 5, difficulty: "easy"}
        const query = await Tour.find(queryObject)
        // const query = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')

        //EXECUTE QUERY (NEEDED TO SEPERATE THIS SO THAT WE CAN USE MONGOOSE METHODS ON QUERY)
        const tours = await query

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
        res.send(404).json({
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

export { getAllTours, getTour, createTour, updateTour, deleteTour }