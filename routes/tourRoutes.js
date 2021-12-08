import express from 'express';
import { getAllTours, getTour, createTour, updateTour, deleteTour } from './../controllers/tourController.js'

//EXPRESS.ROUTER IS MIDDLEWARE. MIDDLEWARE IS USED IN APP.JS
const router = express.Router();

//ROUTES
//PREVIOUSLY '/API/v1/TOURS' BEFORE USING tourRouter
router.route('/')
    .get(getAllTours)
    .post(createTour)
router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

export default router;