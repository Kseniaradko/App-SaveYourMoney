const express = require('express')
const IncomeType = require('../models/IncomeType')
const Income = require('../models/Income')
const auth = require("../middleware/auth.middleware");
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        const list = await IncomeType.find({$or: [{userId: req.user.id}, {userId: null}]})
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const newType = await IncomeType.create({
            ...req.body,
            userId: req.user.id
        })
        res.status(201).send(newType)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.patch('/:incomeTypeId', auth, async (req, res) => {
    try {
        const {incomeTypeId} = req.params;
        const updatedIncomeType = await IncomeType.findByIdAndUpdate(incomeTypeId, req.body, {new: true})
        res.send(updatedIncomeType)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

router.delete('/:incomeTypeId', auth, async (req, res) => {
    try {
        const {incomeTypeId} = req.params
        const removedIncomeType = await IncomeType.findById(incomeTypeId)

        const incomes = await Income.find({category: incomeTypeId})
        for (const income of incomes) {
            await Income.findByIdAndUpdate(income._id, {category: null}, {new: true})
        }

        await removedIncomeType.remove()
        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router