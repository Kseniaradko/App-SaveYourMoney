import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadIncomesTypeList} from "../store/incomesType";
import {loadExpensesTypeList} from "../store/expensesType";

const useGetTypesForPage = (incomePage, expensePage, limit) => {
    const dispatch = useDispatch()
    const incomeOffset = (incomePage - 1) * limit
    const expenseOffset = (expensePage - 1) * limit

    useEffect(() => {
        dispatch(loadIncomesTypeList(incomeOffset, limit))
    }, [dispatch, incomeOffset, limit])

    useEffect(() => {
        dispatch(loadExpensesTypeList(expenseOffset, limit))
    }, [dispatch, expenseOffset, limit])
}

export default useGetTypesForPage