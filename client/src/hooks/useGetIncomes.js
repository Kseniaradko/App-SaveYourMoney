import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {loadIncomes} from '../store/incomes'

const useGetIncomes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadIncomes())
    }, [dispatch])
}

export default useGetIncomes