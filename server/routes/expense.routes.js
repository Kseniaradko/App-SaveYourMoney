const express = require('express')
const Expense = require('../models/Expense')
const Account = require('../models/Account')
const auth = require("../middleware/auth.middleware");
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        if (!req.query) {
            const list = await Expense.find({userId: req.user.id})
            const count = await Expense.find({userId: req.user.id}).countDocuments()
            const totalPages = Math.ceil(count / 5)
            return res.status(200).send({list, totalPages})
        }

        const {offset, limit, category, accountId, sum, date} = req.query
        const toFind = {userId: req.user.id}
        if (category) {
            toFind.category = category
        }
        if (accountId) {
            toFind.accountId = accountId
        }
        if (sum) {
            toFind.sum = sum
        }
        if (date) {
            const firstly = date.split('T')[0]
            const toConcat = 'T23:59:59.000Z'
            const result = firstly + toConcat

            const createdAt = {
                $gte: date,
                $lt: result
            }
            toFind.createdAt = createdAt
        }


        const list = await Expense.find(toFind)
            .sort({_id: -1})
            .limit(limit)
            .skip(offset)
            .exec()
        const count = await Expense.find(toFind).countDocuments()
        const totalPages = Math.ceil(count / 7)
        res.status(200).send({list, totalPages})
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
        if (account) {
            const resultSum = account.sum + removedExpense.sum
            await Account.findByIdAndUpdate(removedExpense.accountId, {sum: resultSum}, {new: true})
        }

        await removedExpense.remove()
        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router