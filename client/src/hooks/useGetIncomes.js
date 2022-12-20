import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadIncomesList} from "../store/incomes";

const useGetIncomes = (currentPage, limit) => {
    const dispatch = useDispatch()
    const offset = (currentPage - 1) * limit

    useEffect(() => {
        if (!currentPage && !limit) dispatch(loadIncomesList())
        
        dispatch(loadIncomesList(offset, limit))
    }, [currentPage, dispatch, limit, offset])
}

export default useGetIncomes