import fs from 'fs'

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'))

// ROUTE HANDLERS
 const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        request: req.requestTime, 
        results: tours.length,
        data: {
            tours
        }
    })
}

 const getTour = (req, res) => {
    //REQUEST PARAMS PRVOIDES US WITH THE ID
    console.log(req.params)
    //MUST CONVERT PARAM OF ID FROM STRING TO INTEGER
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    //IF NO TOUR 
    if(!tour) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

 const createTour = (req, res) => {
    // MUST CREATE ITEM WITH NEW ID 
    const newId = tours[tours.length - 1].id + 1
    // USE OBJECT.ASSIGN TO COMBINE THE NEW ID WITH THE REQ.BODY (WHICH IS JSON BENT SENT)
    const newTour = Object.assign({id: newId}, req.body)
    // PUSH NEWTOUR INTO TOUR ARRAY
    tours.push(newTour)
    // WRITE FILE WITH NEW TOUR
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                newTour
            }
        })
    } )
}

 const updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            tour: "<Updated tour...>"
        }
    })
}

 const deleteTour = (req, res) => {
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }

    res.status(204).json({
        status: "success",
        data: null
    })
}

export { getAllTours, getTour, createTour, updateTour, deleteTour }