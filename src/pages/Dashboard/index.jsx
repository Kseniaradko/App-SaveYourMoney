import React from "react"
import IncomePlugin from "../../components/IncomePlugin";
import AccountsPlugin from "../../components/AccountsPlugin";
import ExpensesPlugin from "../../components/ExpensesPlugin";
import AnalyticsInfo from "./AnalyticsInfo";

const Dashboard = () => {
    return (
        <div className='flex-1 max-w-screen-xl m-auto w-full'>
            <div className="py-4 px-6 flex justify-between">
                <IncomePlugin/>
                <AccountsPlugin/>
                <ExpensesPlugin/>
            </div>
            <div className='py-4 px-6'>
                <AnalyticsInfo/>
            </div>
        </div>
    )
}

export default Dashboard