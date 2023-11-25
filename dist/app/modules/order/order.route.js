'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.orderRouters = void 0
const express_1 = __importDefault(require('express'))
const order_controller_1 = require('./order.controller')
const auth_1 = __importDefault(require('../../middlewares/auth'))
const user_1 = require('../../enums/user')
const router = express_1.default.Router()
router.post('/make-order', order_controller_1.orderController.createOrder)
router.get(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN),
  order_controller_1.orderController.getAllOrder,
)
router.get('/:id', order_controller_1.orderController.getSingleOrder)
router.patch('/:id', order_controller_1.orderController.updateOrder)
exports.orderRouters = router
