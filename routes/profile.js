import express from "express"
import auth from '../middleware/auth.js'
const router = express.Router()

import { create } from "../controllers/profile.js"

router.post("/create", auth, create)

export default router