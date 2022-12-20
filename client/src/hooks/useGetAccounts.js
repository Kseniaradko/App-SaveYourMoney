import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadAccountsList} from "../store/accounts";

const useGetAccounts = (currentPage, limit) => {
    const dispatch = useDispatch()
    const offset = (currentPage - 1) * limit

    useEffect(() => {
        if (!currentPage && !limit) dispatch(loadAccountsList())
        dispatch(loadAccountsList(offset, limit))
    }, [currentPage])
}

export default useGetAccounts