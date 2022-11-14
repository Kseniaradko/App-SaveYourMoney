import React from "react";
import OperationsInfo from "../OperationsInfo";
import incomeIcon from './incomeIcon.svg'

const IncomePlugin = () => {
    const incomes = [
        {
            id: 1,
            title: 'Зарплата',
            sum: 3200
        },
        {
            id: 2,
            title: 'Наследство',
            sum: 200000
        }
    ]
    return (
        <OperationsInfo label={"Доходы"} data={incomes} img={incomeIcon}/>
    )
}

export default IncomePlugin