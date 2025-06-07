import express from 'express';
import {login, signup, submitURL} from '../controller/auth.controller.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/submitURL',submitURL);


export default router;
