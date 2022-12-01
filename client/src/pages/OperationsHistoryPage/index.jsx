import React, {useState, useEffect} from "react";
import Table from "../../components/common/Table";

const MOCKED_OPERATIONS = [
    {
        id: 1,
        type: 'Доход',
        action: 'Добавление',
        date: new Date().toDateString(),
        details: 'Добавили: 1000 с заголовком Зарплата на счет 123121312312321'
    },
    {
        id: 2,
        type: 'Расход',
        action: 'Добавление',
        date: new Date().toDateString(),
        details: 'Потратили: 1000 с заголовком Зарплата со счета 123121312312321'
    },
    {
        id: 3,
        type: 'Счет',
        action: 'Добавление',
        date: new Date().toDateString(),
        details: 'Добавили новый счет - Наличные'
    },
]

const OperationsHistoryPage = () => {
    const [operations, setOperations] = useState(null)

    const columns = {
        type: {
            name: 'Категория',
            path: 'type'
        },
        action: {
            name: 'Действие',
            path: 'action'
        },
        date: {
            name: 'Дата',
            path: 'date'
        },
        details: {
            name: 'Детали',
            path: 'details'
        }
    }

    useEffect(() => {
        // fetch imitation
        setTimeout(() => {
            setOperations(MOCKED_OPERATIONS)
        }, 2000)
    }, [])

    return (
        <div className='flex-1 max-w-screen-xl m-auto w-full'>
            <div className='text-center text-slate-600 font-semibold py-5 uppercase italic'>История операций</div>
            <Table
                columns={columns}
                data={operations}
            />
        </div>
    )
}

export default OperationsHistoryPage