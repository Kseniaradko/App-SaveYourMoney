import React, {useState} from "react";
import Table from "../../components/common/Table";
import EditIcon from "../../components/common/Table/editIcon";
import DeleteIcon from "../../components/common/Table/deleteIcon";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserExpenses, removeExpense} from "../../store/expenses";
import {Link} from "react-router-dom";
import {getCurrentUserAccounts} from "../../store/accounts";
import Loader from "../../components/common/Loader";
import displayDate from "../../utils/displayDate";
import {toast} from "react-toastify";
import ExpensesModalWindow from "../../components/Plugins/OperationsInfo/ExpensesModalWindow";
import Button from "../../components/common/Button";

const ExpensesPage = () => {
    const dispatch = useDispatch()
    const userExpenses = useSelector(getCurrentUserExpenses())
    const userAccounts = useSelector(getCurrentUserAccounts())
    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        setShowModal(prevState => !prevState)
    }

    const columns = {
        _id: {
            name: '№',
            path: '_id',
            component: (data) => userExpenses.indexOf(data) + 1
        },
        category: {
            name: 'Категория',
            path: 'category',
            component: (data) => <Link to={`/expensesPage/${data._id}`}
                                       className='hover:text-sky-500'>{data.category}</Link>
        },
        accountId: {
            name: 'Счет зачисления',
            path: 'accountId',
            component: (data) => {
                const account = userAccounts.find((account) => account._id === data.accountId)
                if (account) return account.accountName
                return 'Данный счет был удален'
            }
        },
        sum: {
            name: 'Сумма зачисления',
            path: 'sum'
        },
        createdAt: {
            name: 'Дата',
            path: 'createdAt',
            component: (data) => displayDate(data.createdAt)
        },
        edit: {
            name: 'Редактировать',
            component: (data) => <Link to={`/expensesPage/${data._id}`}><EditIcon/></Link>
        },
        delete: {
            name: 'Удалить',
            component: (data) => <DeleteIcon onDelete={() => handleDelete(data._id)}/>
        }
    }

    const handleDelete = (id) => {
        dispatch(removeExpense(id))
        toast.success('Расход был удален!', {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    if (!userExpenses && !userAccounts) return <Loader/>
    if (userExpenses.length === 0) {
        return (
            <div
                className='max-w-screen-xl m-auto flex-col justify-center text-xl italic font-light text-slate-500'>
                {showModal && <ExpensesModalWindow onCLick={handleClick}/>}
                Расходы отсутствуют. Начните добавлять их!
                <div className='flex justify-center' onClick={handleClick}>
                    <Button>Добавить</Button>
                </div>
            </div>
        )
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