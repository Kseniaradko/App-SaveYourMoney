import React from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useSelector} from "react-redux";
import {getCurrentUserIncomes} from "../../store/incomes";
import {Link} from "react-router-dom";
import {getCurrentUserAccounts} from "../../store/accounts";
import EditIncomePage from "./editIncomePage";

const IncomesPage = () => {
    const userIncomes = useSelector(getCurrentUserIncomes())
    const userAccounts = useSelector(getCurrentUserAccounts())

    if (!userIncomes || !userAccounts) {
        return
    }

    const columns = {
        id: {
            name: '№',
            path: 'id',
            component: (data) => userIncomes.indexOf(data) + 1
        },
        type: {
            name: 'Категория',
            path: 'type',
            component: (data) => <Link to={`/incomesPage/${data.id}`} className='hover:text-sky-500'>{data.type}</Link>
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
            component: (data) => <Link to={`/incomesPage/${data.id}`}><EditIcon/></Link>
        },
        delete: {
            name: 'Удалить',
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data.id)}/>
        }
    }

    const handleEdit = (id) => {
        console.log(id)
        return <Link to='`/incomesPage/${id}`'/>
    }

    const handleDelete = (id) => {
        console.log(id)
    }

    return (
        <div className='flex-1 max-w-screen-xl m-auto w-full'>
            <div className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'>Мои доходы</div>
            <Table columns={columns} data={userIncomes.reverse()}/>
        </div>
    )
}

export default IncomesPage