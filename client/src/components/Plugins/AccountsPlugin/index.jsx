import React from "react";
import OperationsInfo from "../OperationsInfo";
import accountsLogo from "./accountsIcon.svg"
import {useSelector} from "react-redux";
import {getAccountLoadingStatus, getAccountsForPlugin} from "../../../store/accounts";
import Loader from "../../common/Loader";

const AccountsPlugin = () => {
    const userAccountsForPlugin = useSelector(getAccountsForPlugin())
    const loadingStatus = useSelector(getAccountLoadingStatus())
    if (!userAccountsForPlugin) return <Loader/>
    return (
        <OperationsInfo label='Счета' data={userAccountsForPlugin} img={accountsLogo} loadingStatus={loadingStatus}/>
    )
}

export default AccountsPlugin