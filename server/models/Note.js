const {Schema, model} = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})

module.exports = model('Note', schema)