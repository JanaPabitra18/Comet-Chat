import express from 'express';
import { registerUser ,loginUser,logoutUser, getotherUserProfile} from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/').get(isAuthenticated,getotherUserProfile);
export default router;