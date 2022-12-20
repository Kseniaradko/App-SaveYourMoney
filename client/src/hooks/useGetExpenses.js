import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadExpensesList} from "../store/expenses";

const useGetExpenses = (currentPage, limit) => {
    const dispatch = useDispatch()
    const offset = (currentPage - 1) * limit

    useEffect(() => {
        if (!currentPage && !limit) dispatch(loadExpensesList())
        dispatch(loadExpensesList(offset, limit))
    }, [currentPage])
}

export default useGetExpenses