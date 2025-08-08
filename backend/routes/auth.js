const express = require('express')
const router = express.Router()
const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET


// Route 1
// Create user using POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password length must be 8 characters').isLength({ min: 8 }),
],
    async (req, res) => {
        let success = false
        // If there are errors, return Bad Request and errors 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            success = false
            return res.status(400).json({ success, errors: errors.array() })
        };

        try {
            // Check whether user with this email already exists
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                success = false
                return res.status(400).json({ success, error: "Sorry user with this email already exists" })
            }

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)

            // Create New User
            user = await User.create({
                username: req.body.name,
                email: req.body.email,
                password: secPass,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({ success, authtoken })
        }
        // Handling error
        catch (error) {
            console.error(error.message)
            res.status(500).send('Internal server Error')
        }
    })

// Route 2
// Authenticate User using "/api/auth/login"
router.post('/login', [
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false

    // If there are errors, return Bad Request and errors 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    };

    const { email, password } = req.body
    try {

        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please use correct credentials." })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please use correct credentials." })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error')
    }
})

// Route 3 Get LoggedIn User Details Login Required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        user = req.user.id
        const user = await User.findById(user).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error')
    }
})
module.exports = router