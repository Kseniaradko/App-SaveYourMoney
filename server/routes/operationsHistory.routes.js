const express = require('express')
const auth = require('../middleware/auth.middleware')
const OperationsHistory = require('../models/OperationsHistory')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        const list = await OperationsHistory.find({userId: req.user.id})
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const newOperation = await OperationsHistory.create({
            ...req.body,
            userId: req.user.id
        })
        res.status(201).send(newOperation)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

module.exports = router