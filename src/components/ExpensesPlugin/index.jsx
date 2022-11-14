import React from "react";
import OperationsInfo from "../OperationsInfo";
import expensesIcon from './expensesIcon.svg'

const ExpensesPlugin = () => {
    const expenses = [
        {
            id: 1,
            title: 'Лекарства',
            sum: 3400
        },
        {
            id: 2,
            title: 'Развлечения',
            sum: 6000
        }
    ]
    return (
        <OperationsInfo label='Расходы' data={expenses} img={expensesIcon}/>
    )
}

export default ExpensesPlugin