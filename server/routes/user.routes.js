const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const bcrypt = require("bcryptjs");

router.patch('/', auth, async (req, res) => {
    try {
        const {password} = req.body
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12)
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {
                ...req.body,
                password: hashedPassword
            }, {new: true})
            return res.send(updatedUser)
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {new: true})
        res.send(updatedUser)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

router.get("/", auth, async (req, res) => {
    try {
        const list = await User.findById(req.user.id || req.user._id);
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router
