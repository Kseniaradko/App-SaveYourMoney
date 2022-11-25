import React from "react";
import Table from "../../components/common/Table";
import EditColumn from "../../components/common/Table/editColumn";
import DeleteColumn from "../../components/common/Table/deleteColumn";
import {useSelector} from "react-redux";
import {getCurrentUserExpenses} from "../../store/expenses";

const ExpensesPage = () => {
    const userExpenses = useSelector(getCurrentUserExpenses())
    const columns = {
        type: {
            name: 'Категория',
            path: 'type'
        },
        account: {
            name: 'Счет зачисления',
            path: 'account'
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
                Мои расходы
            </div>
            <Table columns={columns} data={userExpenses}/>
        </div>
    )
}

export default ExpensesPage