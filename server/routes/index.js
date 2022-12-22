const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/income', require('./income.routes'))
router.use('/account', require('./account.routes'))
router.use('/expense', require('./expense.routes'))
router.use('/incomeTypes', require('./incomeTypes.routes'))
router.use('/expenseTypes', require('./expensesTypes.routes'))
router.use('/history', require('./operationsHistory.routes'))
router.use('/charts', require('./charts.routes'))
router.use('/notes', require('./note.routes'))

module.exports = router