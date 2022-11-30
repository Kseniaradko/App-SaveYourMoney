import React from "react";
import OperationsInfo from "../OperationsInfo";
import accountsLogo from "./accountsIcon.svg"
import {useSelector} from "react-redux";
import {getAccountsForPlugin} from "../../../store/accounts";

const AccountsPlugin = () => {
    const userAccountsForPlugin = useSelector(getAccountsForPlugin())
    return (
        <OperationsInfo label='Счета' data={userAccountsForPlugin} img={accountsLogo}/>
    )
}

export default AccountsPlugin