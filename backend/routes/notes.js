const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator')

// Route 1 
// Fetch all notes using: GET "/api/notes/fetchallnotes" Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error')
    }

})

// Route 2
// Add new note: POST "/api/notes/addnote" Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter Valid title').isLength({ min: 3 }),
    body('description', 'Atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req)
        if (!errors) {
            return res.status(400).json({ errors: error.array() })
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        }
        )
        const savedNote = await note.save()
        res.json(savedNote)
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error')
    }
})

// Route 3
// Update existing note: PUT "/api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body

        //Create new note object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag !== undefined) { newNote.tag = tag }

        // Find note to be updated and updateit
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send('Not Found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error')
    }
})

// Route 4
// Delete note: DELETE "/api/notes/deletenote" Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send('Not Found') }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Deleted", note: note })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error')
    }
})

module.exports = router

