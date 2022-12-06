const express = require('express')
const Account = require('../models/Account')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        const list = await Account.find({userId: req.user.id})
        res.status(200).send(list)
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
        await removedAccount.remove()
        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        });
    }
})

module.exports = router