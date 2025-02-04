import { Router } from 'express'
import DataValidation from '../../Middleware/DataValidation'
import usrValidation from './userValidation'
import { userController } from './userController'
import loginValidation from '../auth/authValidation'
import { AuthController } from '../auth/authController'

const router = Router()

router.post(
  '/register',
  DataValidation(usrValidation),
  userController.usersController,
)
router.post(
  '/login',
  DataValidation(loginValidation),
  AuthController.loginController,
)
router.post('/verify', AuthController.verifyCodeController)

export const userRouter = router
