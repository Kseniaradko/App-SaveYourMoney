import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {loadOperationsList} from '../store/operationsHistory'

const useGetOperations = (currentPage, limit, filter) => {
    const offset = (currentPage - 1) * limit
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadOperationsList(offset, limit, filter))
    }, [currentPage, dispatch, filter.type, filter.action, filter.date, limit, offset])
}

export default useGetOperations