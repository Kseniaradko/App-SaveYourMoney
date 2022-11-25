import React, {useEffect, useState} from "react";
import Table from "../../components/common/Table";
import EditColumn from "../../components/common/Table/editColumn";
import DeleteColumn from "../../components/common/Table/deleteColumn";
import {useSelector} from "react-redux";
import {getCurrentUserIncomes, getIncomesForPlugin} from "../../store/incomes";

const MOCKED_INCOMES = [
    {
        id: 1,
        type: 'Зарплата',
        account: 'Счет 1234556',
        sum: 3000000,
        date: new Date().toDateString()
    },
    {
        id: 2,
        type: 'Наследство',
        account: 'Наличные',
        sum: 500000,
        date: new Date().toDateString()
    },
    {
        id: 3,
        type: 'Подарок',
        account: 'Дебетовая карта МИР',
        sum: 5000,
        date: new Date().toDateString()
    },
]

const IncomesPage = () => {
    const userIncomes = useSelector(getCurrentUserIncomes())
    const [incomes, setIncomes] = useState(null)
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

    useEffect(() => {
        setTimeout(() => {
            setIncomes(MOCKED_INCOMES)
        }, 2000)
    }, [])

    return (
        <div className='flex-1 max-w-screen-xl m-auto w-full'>
            <div className='text-center text-slate-500 text-2xl underline underline-offset-8 py-4'>Мои доходы</div>
            <Table columns={columns} data={userIncomes}/>
        </div>
    )
}

export default IncomesPage