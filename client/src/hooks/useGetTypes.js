import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {loadIncomesType} from '../store/incomesType'
import {loadExpenseType} from '../store/expensesType'

const useGetTypes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadIncomesType())
        dispatch(loadExpenseType())
    }, [dispatch])
}

export default useGetTypes