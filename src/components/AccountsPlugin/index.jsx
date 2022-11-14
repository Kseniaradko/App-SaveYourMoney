import React from "react";
import OperationsInfo from "../OperationsInfo";
import accountsLogo from "./accountsIcon.svg"

const AccountsPlugin = () => {
    const accounts = [
        {
            id: 1,
            title: 'Банковский счет',
            sum: 52000
        },
        {
            id: 2,
            title: 'Наличные',
            sum: 64500
        }
    ]
    return (
        <OperationsInfo label='Счета' data={accounts} img={accountsLogo}/>
    )
}

export default AccountsPlugin