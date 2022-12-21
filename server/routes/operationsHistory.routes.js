const express = require('express')
const auth = require('../middleware/auth.middleware')
const OperationsHistory = require('../models/OperationsHistory')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    const {offset, limit, type, action, date} = req.query
    try {
        const toFind = {userId: req.user.id}
        if (type) {
            toFind.type = type
        }
        if (action) {
            toFind.action = action
        }
        if (date) {
            toFind.date = date
        }

        const list = await OperationsHistory.find(toFind)
            .sort({_id: -1})
            .limit(limit)
            .skip(offset)
            .exec()
        const count = await OperationsHistory.find(toFind).countDocuments()
        const totalPages = Math.ceil(count / limit)

        res.status(200).send({list, totalPages})
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