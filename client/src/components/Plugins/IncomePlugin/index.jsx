import React from "react";
import OperationsInfo from "../OperationsInfo";
import incomeIcon from './incomeIcon.svg'
import {useSelector} from "react-redux";
import {getIncomesForPlugin} from "../../../store/incomes";
import Loader from "../../common/Loader";

const IncomePlugin = () => {
    const userIncomesForPlugin = useSelector(getIncomesForPlugin())
    if (!userIncomesForPlugin) return <Loader/>
    return (
        <OperationsInfo label='Доходы' data={userIncomesForPlugin} img={incomeIcon}/>
    )
}

export default IncomePlugin