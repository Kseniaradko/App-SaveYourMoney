const {Schema, model} = require('mongoose')

const schema = new Schema({
    accountName: {
        type: String,
        required: true
    },
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    sum: Number
}, {
    timestamps: true
})

module.exports = model('Account', schema)