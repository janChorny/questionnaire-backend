const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const notes = await Note.find().lean()

    // If no notes 
    if (!notes?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec()
        return { ...note, username: user.username }
    }))

    res.json(notesWithUser)
})

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { 
      user, 
      patientOneStomata, 
      patientTwoStomata, 
      patientThreeStomata, 
      patientFourStomata,
      patientFiveStomata,
      stomataQuality,
      stomataEasyHard,
      stomataEssentialTime,
      stomataEssentialBegin,
      stomataEssentialQuantity,
      stomataEssentialRepeat,
      needMarkInclude,
      stomataOccupation,
      stomataPlaceOccupation,
      stomataHalfTimeOccupation,
      yourName 
    } = req.body

    // Confirm data
    if (
      !user || 
      !patientOneStomata || 
      !patientTwoStomata || 
      !patientThreeStomata || 
      !patientFourStomata ||
      !patientFiveStomata ||
      !stomataQuality ||
      !stomataEasyHard ||
      !stomataEssentialTime ||
      !stomataEssentialBegin ||
      !stomataEssentialQuantity ||
      !stomataEssentialRepeat ||
      !needMarkInclude ||
      !stomataOccupation ||
      !stomataPlaceOccupation ||
      !stomataHalfTimeOccupation ||
      !yourName 
      ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const note = await Note.create(
      { 
        user, 
        patientOneStomata, 
        patientTwoStomata, 
        patientThreeStomata, 
        patientFourStomata,
        patientFiveStomata,
        stomataQuality,
        stomataEasyHard,
        stomataEssentialTime,
        stomataEssentialBegin,
        stomataEssentialQuantity,
        stomataEssentialRepeat,
        needMarkInclude,
        stomataOccupation,
        stomataPlaceOccupation,
        stomataHalfTimeOccupation,
        yourName 
      }
    )

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    deleteNote
}
