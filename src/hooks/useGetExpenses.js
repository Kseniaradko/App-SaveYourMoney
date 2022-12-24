import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {loadExpenses} from '../store/expenses'

const useGetExpenses = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadExpenses())
    }, [dispatch])
}

export default useGetExpenses