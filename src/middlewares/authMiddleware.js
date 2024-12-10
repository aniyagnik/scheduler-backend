import jwt from "jsonwebtoken"

import { ApiError } from "../utils/index.js";
import { User } from "../models/index.js";

const verifyJWT = async(req, _, next) => {
	try {
		const token = req.session.passport?.user?.accessToken
		if (!token) {
				throw new ApiError(401, "Unauthorized request")
		}
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'hahha')
		const user = await User.findById(decodedToken?._id).select("-refreshToken")

		if (!user) {		
				throw new ApiError(401, "Invalid Access Token")
		}
		req.user = user;
		next()
	} catch (error) {
		console.log(error)
		throw new ApiError(401, error?.message || "Invalid access token")
	}   
}

export default verifyJWT