const {Schema, model} = require('mongoose')

const schema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'IncomeType', required: true},
    sum: Number,
    accountId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})

module.exports = model('Income', schema)