import React from "react";
import OperationsInfo from "../OperationsInfo";
import incomeIcon from './incomeIcon.svg'
import {useSelector} from "react-redux";
import {getIncomesForPlugin} from "../../../store/incomes";
import Loader from "../../common/Loader";
import {getIncomesTypes} from "../../../store/incomesType";

const IncomePlugin = () => {
    const userIncomesForPlugin = useSelector(getIncomesForPlugin())
    const types = useSelector(getIncomesTypes())

    const info = userIncomesForPlugin?.map((income) => {
        const type = types?.find((type) => type._id === income.category)
        const name = type?.name
        return {
            _id: income._id,
            name: name,
            sum: income.sum
        }
    })

    if (!userIncomesForPlugin) return <Loader/>
    return (
        <OperationsInfo label='Доходы' data={info} img={incomeIcon}/>
    )
}

export default IncomePlugin