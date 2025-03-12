import express from 'express'
import {authAdminLogin, authAdminRegister, authUserLogin, authUserRegister} from '../controllers/authController.js'
import {validateLogin, validateRegister} from '../middlewares/authValidatorMiddleware.js'
import { verifyToken } from '../middlewares/verifyTokenMiddleware.js'
import {getAllUsers, getUser, modifyUser, deleteUser} from '../controllers/userController.js'

const router = express.Router()
router.use(express.json())

router.post('/login', validateLogin, authUserLogin)
router.post('/register', validateRegister, authUserRegister)
router.post('/listUsers', verifyToken, getAllUsers)
router.post('/getUser/:id', verifyToken, getUser)
router.post('/update', verifyToken, modifyUser)
router.post('/delete', verifyToken, deleteUser)
router.post('/adminlogin', validateLogin, authAdminLogin)
router.post('/adminregister',validateRegister, authAdminRegister)

export default router;