import React from "react"
import IncomePlugin from "../../components/Plugins/IncomePlugin";
import AccountsPlugin from "../../components/Plugins/AccountsPlugin";
import ExpensesPlugin from "../../components/Plugins/ExpensesPlugin";
import AnalyticsInfo from "./AnalyticsInfo";
import {useSelector} from "react-redux";
import {getDataStatus} from "../../store/users";
import Loader from "../../components/common/Loader";
import useGetTypes from "../../hooks/useGetTypes";
import useGetIncomes from "../../hooks/useGetIncomes";
import useGetExpenses from "../../hooks/useGetExpenses";
import useGetAccounts from "../../hooks/useGetAccounts";

const Dashboard = () => {
    useGetTypes()
    useGetIncomes()
    useGetExpenses()
    useGetAccounts()

    const dataStatus = useSelector(getDataStatus())


    if (!dataStatus) return <Loader/>
    return (
        <div className='max-w-screen-xl m-auto w-full'>
            <div className="flex justify-between gap-4 py-2">
                <IncomePlugin/>
                <AccountsPlugin/>
                <ExpensesPlugin/>
            </div>
            <div className='py-2'>
                <AnalyticsInfo/>
            </div>
        </div>
    )
}

export default Dashboard