const express = require('express')
const Account = require('../models/Account')
const Income = require('../models/Income')
const Expense = require('../models/Expense')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        if (!req.query) {
            const list = await Account.find({userId: req.user.id})
            const count = await Account.find({userId: req.user.id}).countDocuments()
            const totalPages = Math.ceil(count / 5)

            return res.status(200).send({list, totalPages})
        }

        const {offset, limit} = req.query
        const list = await Account.find({userId: req.user.id})
            .sort({_id: -1})
            .limit(limit)
            .skip(offset)
            .exec()

        const count = await Account.find({userId: req.user.id}).countDocuments()
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
        const newAccount = await Account.create({
            ...req.body,
            userId: req.user.id
        })
        res.status(201).send(newAccount)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.patch('/:accountId', auth, async (req, res) => {
    try {
        const {accountId} = req.params;
        const updatedAccount = await Account.findByIdAndUpdate(accountId, req.body, {new: true});
        res.send(updatedAccount)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

router.delete('/:accountId', auth, async (req, res) => {
    try {
        const {accountId} = req.params;
        const removedAccount = await Account.findById(accountId);

        const incomes = await Income.find({accountId: accountId})
        for (const income of incomes) {
            await Income.findByIdAndUpdate(income._id, {accountId: null}, {new: true})
        }

        const expenses = await Expense.find({accountId: accountId})
        for (const expense of expenses) {
            await Expense.findByIdAndUpdate(expense._id, {accountId: null}, {new: true})
        }

        await removedAccount.remove()
        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router