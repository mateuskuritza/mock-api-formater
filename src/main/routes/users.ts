import { Router } from 'express';
import collectUsersDataController from '../controllers/user/collectUsersDataController';

const userRoutes = Router();

userRoutes.get('/', collectUsersDataController)

export default userRoutes;