import React from "react";
import OperationsInfo from "../OperationsInfo";
import expensesIcon from './expensesIcon.svg'
import {useSelector} from "react-redux";
import {getExpensesForPlugin} from "../../../store/expenses";

const ExpensesPlugin = () => {
    const userExpensesForPlugin = useSelector(getExpensesForPlugin())
    return (
        <OperationsInfo label='Расходы' data={userExpensesForPlugin} img={expensesIcon}/>
    )
}

export default ExpensesPlugin