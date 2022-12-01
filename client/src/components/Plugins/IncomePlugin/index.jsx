import React from "react";
import OperationsInfo from "../OperationsInfo";
import incomeIcon from './incomeIcon.svg'
import {useSelector} from "react-redux";
import {getIncomesForPlugin} from "../../../store/incomes";

const IncomePlugin = () => {
    const userIncomesForPlugin = useSelector(getIncomesForPlugin())
    return (
        <OperationsInfo label='Доходы' data={userIncomesForPlugin} img={incomeIcon}/>
    )
}

export default IncomePlugin