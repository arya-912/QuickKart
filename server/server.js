import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.js'

import { connectDB } from './lib/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 6000

app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
	console.log(`Server running on  http://localhost:${PORT}`)

	connectDB()
})