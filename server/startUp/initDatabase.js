const IncomeType = require('../models/IncomeType')
const ExpenseType = require('../models/ExpenseType')
const incomeTypesMock = require('../mock/incomeTypes.json')
const expenseTypesMock = require('../mock/expenseTypes.json')


module.exports = async () => {
    const incomeTypes = await IncomeType.find()
    if (incomeTypes.length < incomeTypesMock.length) {
        createInitialEntity(IncomeType, incomeTypesMock)
    }

    const expenseTypes = await ExpenseType.find()
    if (expenseTypes.length < expenseTypesMock.length) {
        createInitialEntity(ExpenseType, expenseTypesMock)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id;
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (error) {
                return error
            }
        })
    )
}
