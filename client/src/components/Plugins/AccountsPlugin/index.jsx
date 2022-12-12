import React from "react";
import OperationsInfo from "../OperationsInfo";
import accountsLogo from "./accountsIcon.svg"
import {useSelector} from "react-redux";
import {getAccountsForPlugin} from "../../../store/accounts";
import Loader from "../../common/Loader";

const AccountsPlugin = () => {
    const userAccountsForPlugin = useSelector(getAccountsForPlugin())
    if (!userAccountsForPlugin) return <Loader/>
    return (
        <OperationsInfo label='Счета' data={userAccountsForPlugin} img={accountsLogo}/>
    )
}

export default AccountsPlugin