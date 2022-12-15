const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    type: {type: String},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

module.exports = model('ExpenseType', schema)