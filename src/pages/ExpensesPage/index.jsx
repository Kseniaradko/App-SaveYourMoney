import React from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useSelector} from "react-redux";
import {getCurrentUserExpenses} from "../../store/expenses";
import {Link} from "react-router-dom";
import {getAccountsName, getCurrentUserAccounts} from "../../store/accounts";

const ExpensesPage = () => {
    const userExpenses = useSelector(getCurrentUserExpenses())
    const userAccounts = useSelector(getCurrentUserAccounts())
    const columns = {
        id: {
            name: '№',
            path: 'id',
            component: (data) => userExpenses.indexOf(data) + 1
        },
        type: {
            name: 'Категория',
            path: 'type',
            component: (data) => <Link to={`/expensesPage/${data.id}`} className='hover:text-sky-500'>{data.type}</Link>
        },
        accountId: {
            name: 'Счет зачисления',
            path: 'accountId',
            component: (data) => userAccounts.find((account) => account.accountId === data.accountId).account
        },
        sum: {
            name: 'Сумма зачисления',
            path: 'sum'
        },
        date: {
            name: 'Дата',
            path: 'date'
        },
        edit: {
            name: 'Редактировать',
            component: (data) => <Link to={`/expensesPage/${data.id}`}><EditIcon/></Link>
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
                Мои расходы
            </div>
            <Table columns={columns} data={userExpenses.reverse()}/>
        </div>
    )
}

export default ExpensesPage