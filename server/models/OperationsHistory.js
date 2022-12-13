const {Schema, model} = require('mongoose')

const schema = new Schema({
    type: {type: String, required: true},
    category: {type: String},
    action: {type: String, required: true},
    sum: Number,
    accountName: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})

module.exports = model('OperationsHistory', schema)