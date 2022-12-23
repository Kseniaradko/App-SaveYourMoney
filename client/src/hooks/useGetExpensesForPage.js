import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {loadExpensesList} from '../store/expenses'

const useGetExpensesForPage = (currentPage, limit, filter) => {
    const dispatch = useDispatch()
    const offset = (currentPage - 1) * limit

    useEffect(() => {
        dispatch(loadExpensesList(offset, limit, filter))
    }, [currentPage, dispatch, filter.category, filter.sum, filter.accountId, filter.date, limit, offset])
}

export default useGetExpensesForPage