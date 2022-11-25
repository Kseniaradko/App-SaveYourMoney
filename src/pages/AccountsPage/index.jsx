import React, {useEffect, useState} from "react";
import Table from "../../components/common/Table";
import EditColumn from "../../components/common/Table/editColumn";
import DeleteColumn from "../../components/common/Table/deleteColumn";
import history from "../../utils/history";
import Button from "../../components/common/Button";
import {data} from "autoprefixer";
import {useSelector} from "react-redux";
import {getCurrentUserAccounts} from "../../store/accounts";

const AccountsPage = () => {
    const userAccounts = useSelector(getCurrentUserAccounts())

    const columns = {
        accountId: {
            name: '№',
            path: 'accountId'
        },
        account: {
            name: 'Счет',
            path: 'account'
        },
        sum: {
            name: 'Сумма на счету',
            path: 'sum'
        },
        date: {
            name: 'Дата создания',
            path: 'date'
        },
        edit: {
            name: 'Редактировать',
            component: (data) => <EditColumn onClick={() => handleEdit(data.id)}/>
        },
        delete: {
            name: 'Удалить',
            component: (data) => <DeleteColumn onDelete={() => handleDelete(data.id)}/>
        }
    }

    const handleEdit = (id) => {
        console.log(id)
    }

    const handleDelete = (id) => {
        console.log(id)
    }

    return (
        <div className='flex-1 max-w-screen-xl m-auto w-full'>
            <div
                className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'
            >
                Мои счета
            </div>
            <Table columns={columns} data={userAccounts}/>
        </div>
    )
}

export default AccountsPage