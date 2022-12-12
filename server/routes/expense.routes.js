const express = require('express')
const Expense = require('../models/Expense')
const Account = require('../models/Account')
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

        const result = await Account.find({_id: req.body.accountId})
        const account = result[0]
        const newSum = Number(account.sum) - Number(req.body.sum)

        await Account.findByIdAndUpdate(req.body.accountId, {
            sum: newSum
        }, {new: true})

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
        const expense = await Expense.findOne({_id: expenseId, accountId: req.body.accountId})

        if (expense !== null) {
            const resultDiff = expense.sum - Number(req.body.sum)
            const result = await Account.findById(req.body.accountId)
            const newSum = result.sum + resultDiff
            await Account.findByIdAndUpdate(req.body.accountId, {
                sum: newSum
            }, {new: true})
        } else {
            const expense = await Expense.findById(expenseId)
            const pastAccount = await Account.findById(expense.accountId)
            const newAccount = await Account.findById(req.body.accountId)
            const newSumForPastAcc = pastAccount.sum + req.body.sum
            await Account.findByIdAndUpdate(expense.accountId, {sum: newSumForPastAcc}, {new: true})
            const newSumForNewAcc = newAccount.sum - req.body.sum
            await Account.findByIdAndUpdate(req.body.accountId, {sum: newSumForNewAcc}, {new: true})
        }

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

        const account = await Account.findById(removedExpense.accountId)
        const resultSum = account.sum + removedExpense.sum
        await Account.findByIdAndUpdate(removedExpense.accountId, {sum: resultSum}, {new: true})

        await removedExpense.remove()
        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router