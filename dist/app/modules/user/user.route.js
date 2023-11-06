"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post('/create-user', user_controller_1.userController.createUser);
router.get('/single-user', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), user_controller_1.userController.getSingleUser);
router.patch('/update-user/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), user_controller_1.userController.updateUser);
exports.userRouters = router;
