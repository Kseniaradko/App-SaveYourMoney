const express = require('express')
const Income = require('../models/Income')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        const list = await Income.find({userId: req.user.id})
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const newIncome = await Income.create({
            ...req.body,
            userId: req.user.id
        })
        res.status(201).send(newIncome)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.patch('/:incomeId', auth, async (req, res) => {
    try {
        const {incomeId} = req.params;
        const updatedIncome = await Income.findByIdAndUpdate(incomeId, req.body, {new: true});
        res.send(updatedIncome)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

router.delete('/:incomeId', auth, async (req, res) => {
    try {
        const {incomeId} = req.params;
        const removedIncome = await Income.findById(incomeId);
        await removedIncome.remove()
        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router