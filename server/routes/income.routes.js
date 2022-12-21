const express = require('express')
const Income = require('../models/Income')
const auth = require('../middleware/auth.middleware')
const Account = require('../models/Account')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        if (!req.query) {
            const list = await Income.find({userId: req.user.id})
            const count = await Income.find({userId: req.user.id}).countDocuments()
            const totalPages = Math.ceil(count / 5)

            return res.status(200).send({list, totalPages})
        }


        const {offset, limit, category, accountId, sum} = req.query
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

        const list = await Income.find(toFind)
            .sort({_id: -1})
            .limit(limit)
            .skip(offset)
            .exec()

        const count = await Income.find(toFind).countDocuments()
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
        const newIncome = await Income.create({
            ...req.body,
            userId: req.user.id
        })
        const result = await Account.find({_id: req.body.accountId})
        const account = result[0]
        const newSum = Number(account.sum) + Number(req.body.sum)

        await Account.findByIdAndUpdate(req.body.accountId, {
            sum: newSum
        }, {new: true})

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
        const income = await Income.findOne({_id: incomeId, accountId: req.body.accountId})

        if (income !== null) {
            const resultDiff = Number(req.body.sum) - income.sum
            const result = await Account.findById(req.body.accountId)
            const newSum = result.sum + resultDiff
            await Account.findByIdAndUpdate(req.body.accountId, {
                sum: newSum
            }, {new: true})
        } else {
            const income = await Income.findById(incomeId)
            const pastAccount = await Account.findById(income.accountId)
            const newAccount = await Account.findById(req.body.accountId)
            const newSumForPastAcc = pastAccount.sum - req.body.sum
            await Account.findByIdAndUpdate(income.accountId, {sum: newSumForPastAcc}, {new: true})
            const newSumForNewAcc = newAccount.sum + req.body.sum
            await Account.findByIdAndUpdate(req.body.accountId, {sum: newSumForNewAcc}, {new: true})
        }

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

        const account = await Account.findById(removedIncome.accountId)
        if (account) {
            const resultSum = account.sum - removedIncome.sum
            await Account.findByIdAndUpdate(removedIncome.accountId, {sum: resultSum}, {new: true})
        }

        await removedIncome.remove()
        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router