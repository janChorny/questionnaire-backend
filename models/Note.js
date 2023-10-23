const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        patientOneStomata: {
          type: String,
          required: true,
        },
        patientTwoStomata: {
          type: String,
          required: true,
        },
        patientThreeStomata: {
          type: String,
          required: true,
        },
        patientFourStomata: {
          type: String,
          required: true,
        },
        patientFiveStomata: {
          type: String,
          required: true,
        },
        stomataQuality: {
          type: String,
          required: true,
        },
        stomataEasyHard: {
          type: String,
          required: true,
        },
        stomataEssentialTime: {
            type: String,
            required: true
        },
        stomataEssentialBegin: {
            type: String,
            required: true
        },
        stomataEssentialQuantity: {
            type: String,
            required: true
        },
        stomataEssentialRepeat: {
            type: String,
            required: true
        },
        needMarkInclude: {
            type: String,
            required: true
        },
        stomataOccupation: {
            type: String,
            required: true
        },
        stomataPlaceOccupation: {
            type: String,
            required: true
        },
        stomataHalfTimeOccupation: {
            type: String,
            required: true
        },
        yourName: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)
