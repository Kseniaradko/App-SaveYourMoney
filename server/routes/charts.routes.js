const express = require('express')
const Expense = require('../models/Expense')
const Income = require('../models/Income')
const auth = require('../middleware/auth.middleware')
const getDate = require("../utils/getDate");
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({userId: req.user.id})
        const incomes = await Income.find({userId: req.user.id})
        const info = {}

        expenses.forEach((expense) => {
            const data = getDate(expense.createdAt)
            if (!info[data]) {
                info[data] = {}
            }
            if (info[data].expenses) {
                info[data].expenses = info[data].expenses + expense.sum
            } else {
                info[data].expenses = expense.sum
            }
        })


        incomes.forEach((income) => {
            const data = getDate(income.createdAt)
            if (!info[data]) {
                info[data] = {}
            }
            if (info[data].incomes) {
                info[data].incomes = info[data].incomes + income.sum
            } else {
                info[data].incomes = income.sum
            }
        })

        return res.status(200).send(info)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

module.exports = router