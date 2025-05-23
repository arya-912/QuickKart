// import { redis } from '../lib/redis.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m'
	})
}


export const signup = async (req, res) => {
	const { email, password, name } = req.body

	try {
		const userExists = await User.findOne({ email })

		if (userExists) {
			return res.status(400).json({ message: "User already exists" })
		}
		const user = await User.create({ name, email, password })

		// authenticate
		const { accessToken, refreshToken}  = generateToken(user._id)
		await storeRefreshToken(user._id, refreshToken)

		setCookies(res, accessToken, refreshToken)

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		})
	} catch (error) {
		console.log("Error in signup controller", error.message)
		res.status(500).json({ message: error.message })
	}
}

export const login = async (req, res) => {
	res.send("Login route called")
}

export const logout = async (req, res) => {
	res.send("Logout route called")
}