const express = require('express')
const Note = require('../models/Note')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
    try {
        const list = await Note.find({userId: req.user.id})
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const newNote = await Note.create({
            ...req.body,
            userId: req.user.id
        })

        res.status(200).send(newNote)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.patch('/', auth, async (req, res) => {
    try {
        const {noteId} = req.query
        const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {new: true})
        res.status(200).send(updatedNote)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        const {noteId} = req.query
        const removedNote = await Note.findById(noteId)

        await removedNote.remove()

        return res.send(null)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})

module.exports = router