import React from "react";
import OperationsInfo from "../OperationsInfo";
import expensesIcon from './expensesIcon.svg'
import {useSelector} from "react-redux";
import {getExpenseLoadingStatus, getExpensesForPlugin} from "../../../store/expenses";
import Loader from "../../common/Loader";
import {getExpensesTypes} from "../../../store/expensesType";

const ExpensesPlugin = () => {
    const userExpensesForPlugin = useSelector(getExpensesForPlugin())
    const types = useSelector(getExpensesTypes())
    const loadingStatus = useSelector(getExpenseLoadingStatus())

    const info = userExpensesForPlugin?.map((expense) => {
        const type = types?.find((type) => type._id === expense.category)
        const name = type?.name
        return {
            _id: expense._id,
            name: name,
            sum: expense.sum
        }
    })

    if (!userExpensesForPlugin) return <Loader/>
    return (
        <OperationsInfo label='Расходы' data={info} img={expensesIcon} loadingStatus={loadingStatus}/>
    )
}

export default ExpensesPlugin