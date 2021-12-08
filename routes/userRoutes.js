import express from 'express'
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from './../controllers/userController.js'

const router = express.Router()

//PREVIOUSLY '/API/v1/USERS' BEFORE USING tourRouter
router.route('/')
    .get(getAllUsers)
    .post(createUser)
router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

export default router;