import React from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useSelector} from "react-redux";
import {getCurrentUserAccounts} from "../../store/accounts";
import {Link} from "react-router-dom";

const AccountsPage = () => {
    const userAccounts = useSelector(getCurrentUserAccounts())

    const columns = {
        accountId: {
            name: '№',
            path: 'accountId',
            component: (data) => userAccounts.indexOf(data) + 1
        },
        account: {
            name: 'Счет',
            path: 'account',
            component: (data) => <Link to={`/accountsPage/${data.id}`}
                                       className='hover:text-sky-500'>{data.account}</Link>
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
            component: (data) => <EditIcon onClick={() => handleEdit(data.id)}/>
        },
        delete: {
            name: 'Удалить',
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data.id)}/>
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
            <Table columns={columns} data={userAccounts.reverse()}/>
        </div>
    )
}

export default AccountsPage