import express from "express"
import auth from '../middleware/auth.js'
const router = express.Router()

import { getUsers, getUser, deleteUser, resetPassword, sendEmail, signup, signin, googleSignIn, updateUser } from "../controllers/user.js"

router.get("/", getUsers)
router.get("/:id", auth, getUser)
router.delete("/:id", auth, deleteUser)
router.patch("/:id", auth, updateUser)
router.post("/reset", resetPassword)
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/forgot", sendEmail)
router.post("/googleSignIn", googleSignIn)

export default router