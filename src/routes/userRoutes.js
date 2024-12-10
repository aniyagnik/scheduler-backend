import passport from 'passport'
import { Router } from "express";

import { loginController } from '../Controllers/index.js';
import { verifyJWT } from "../middlewares/index.js";
import {ApiResponse} from '../utils/index.js'

const router = Router()
router.use(passport.initialize()) 

router.get('/auth/google',loginController.googleAuth)
router.get('/auth/google/callback',passport.authenticate('google', {successRedirect: '/api/v1/user/dashboard',failureRedirect: '/'}));

//secured routes
router.get('/dashboard', verifyJWT ,(req,res) => {
	return res
		.status(200)
		.json(
			new ApiResponse(
				200, 
				"User in dashboard"
			)
		)
})  
router.get("/logout",verifyJWT, loginController.logoutUser)

export default router