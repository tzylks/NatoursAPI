import Tour from './../models/tourModel.js'

//FOR WHEN JSON FILE IS PRESENT, BUT NOT NEEDED
// const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'))

// ROUTE HANDLERS
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        request: req.requestTime,
        // results: tours.length,
        // data: {
        //     tours
        // }
    })
}

const getTour = (req, res) => {
    //REQUEST PARAMS PRVOIDES US WITH THE ID
    // console.log(req.params)
    //MUST CONVERT PARAM OF ID FROM STRING TO INTEGER
    const id = req.params.id * 1
    // const tour = tours.find(el => el.id === id)

    // res.status(200).json({
    //     status: 'success',
    //     // data: {
    //     //     tour
    //     // }
    // })
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

const updateTour = (req, res) => {
    res.status(200).json({
        status: "success",
        // data: {
        //     tour: "<Updated tour...>"
        // }
    })
}

const deleteTour = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null
    })
}

export { getAllTours, getTour, createTour, updateTour, deleteTour }