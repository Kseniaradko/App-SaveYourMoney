const express = require('express')
const Expense = require('../models/Expense')
const auth = require("../middleware/auth.middleware");
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        const list = await Expense.find({userId: req.user.id})
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const newExpense = await Expense.create({
            ...req.body,
            userId: req.user.id
        })
        res.status(201).send(newExpense)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.patch('/:expenseId', auth, async (req, res) => {
    try {
        const {expenseId} = req.params;
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, req.body, {new: true});
        res.send(updatedExpense)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

router.delete('/:expenseId', auth, async (req, res) => {
    try {
        const {expenseId} = req.params;
        const removedExpense = await Expense.findById(expenseId);
        await removedExpense.remove()
        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router