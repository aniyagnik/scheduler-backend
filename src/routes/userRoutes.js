import passport from 'passport'
import { Router } from "express";

import { loginController } from '../Controllers/index.js';

const router = Router()
router.use(passport.initialize()) 

router.get('/auth/google',loginController.googleAuth)
router.get('/auth/google/callback',passport.authenticate('google', {successRedirect: '/api/v1/user/dashboard',failureRedirect: '/'}));

router.use(passport.session())
//secured routes
router.get('/dashboard',loginController.userDashboard)  
router.get("/logout", loginController.logoutUser)

export default router