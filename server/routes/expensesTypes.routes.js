const express = require('express')
const ExpenseType = require('../models/ExpenseType')
const Expense = require('../models/Expense')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        if (!req.query) {
            const list = await ExpenseType.find({$or: [{userId: req.user.id}, {userId: null}]})
            const count = await ExpenseType.find({$or: [{userId: req.user.id}, {userId: null}]}).countDocuments()
            const totalPages = Math.ceil(count / 10)
            return res.status(200).send({list, totalPages})
        }

        const {offset, limit} = req.query
        const list = await ExpenseType.find({$or: [{userId: req.user.id}, {userId: null}]})
            .sort({_id: -1})
            .limit(limit)
            .skip(offset)
            .exec()

        const count = await ExpenseType.find({$or: [{userId: req.user.id}, {userId: null}]}).countDocuments() - 2
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
        const newType = await ExpenseType.create({
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

router.patch('/:expenseTypeId', auth, async (req, res) => {
    try {
        const {expenseTypeId} = req.params;
        const updatedExpenseType = await ExpenseType.findByIdAndUpdate(expenseTypeId, req.body, {new: true})
        res.send(updatedExpenseType)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

router.delete('/:expenseTypeId', auth, async (req, res) => {
    try {
        const {expenseTypeId} = req.params;
        const removedExpenseType = await ExpenseType.findById(expenseTypeId);

        const expenses = await Expense.find({category: expenseTypeId})
        for (const expense of expenses) {
            await Expense.findByIdAndUpdate(expense._id, {category: null}, {new: true})
        }

        await removedExpenseType.remove()
        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router