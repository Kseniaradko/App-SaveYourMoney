import React from "react"
import IncomePlugin from "../../components/Plugins/IncomePlugin";
import AccountsPlugin from "../../components/Plugins/AccountsPlugin";
import ExpensesPlugin from "../../components/Plugins/ExpensesPlugin";
import AnalyticsInfo from "./AnalyticsInfo";

const Dashboard = () => {
    return (
        <div className='max-w-screen-xl m-auto w-full'>
            <div className="flex justify-between gap-4">
                <IncomePlugin/>
                <AccountsPlugin/>
                <ExpensesPlugin/>
            </div>
            <div className='py-4'>
                <AnalyticsInfo/>
            </div>
        </div>
    )
}

export default Dashboard