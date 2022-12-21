import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadIncomesList} from "../store/incomes";

const useGetIncomes = (currentPage, limit, filter) => {
    const dispatch = useDispatch()
    const offset = (currentPage - 1) * limit

    useEffect(() => {
        dispatch(loadIncomesList(offset, limit, filter))
    }, [currentPage, dispatch, limit, offset, filter.date, filter.category, filter.sum, filter.accountId])
}

export default useGetIncomes