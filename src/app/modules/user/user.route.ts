import express from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../enums/user'
const router = express.Router()

router.post('/create-user', userController.createUser)
router.get(
  '/single-user',
  auth(ENUM_USER_ROLE.USER),
  userController.getSingleUser,
)
router.patch(
  '/update-user/:id',
  auth(ENUM_USER_ROLE.USER),
  userController.updateUser,
)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getAllUser)

export const userRouters = router
