import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {loadAccountsList} from '../store/accounts'

const useGetAccountsForPage = (currentPage, limit) => {
    const dispatch = useDispatch()
    const offset = (currentPage - 1) * limit

    useEffect(() => {
        dispatch(loadAccountsList(offset, limit))
    }, [currentPage, dispatch, limit, offset])
}

export default useGetAccountsForPage